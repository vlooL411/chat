import User, { UserDocument } from 'src/user/entity';
import { Injectable } from '@nestjs/common';
import { Authentication, Provider, RegisterInput, UserSafe } from 'src/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PasswordScalar } from 'src/graphql/scalars';
import { genSaltSync, hashSync } from 'bcryptjs';
import { ExistService } from 'src/user/services';

import AuthService from './auth';

@Injectable()
export default class RegisterService {
	constructor(
		private authService: AuthService,
		private existService: ExistService,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async register({
		email,
		name,
		password,
	}: RegisterInput): Promise<UserSafe> {
		//#region Password
		if (!PasswordScalar.check(password)) throw new Error('Password wrong');

		const salt = await genSaltSync(10);
		const hash = await hashSync(password, salt);
		//#endregion

		const isExist = await this.existService.exist(name, email);
		if (isExist) throw new Error('User exist');

		return await this.userModel.create({
			_id: new Types.ObjectId(),
			name,
			email,
			password: hash,
			createdAt: new Date(),
		});
	}

	async registerGoogle(user: UserSafe): Promise<Authentication> {
		if (!user || !user?.google) return;
		const { createdAt, email, name, google } = user;

		const isExist = await this.userModel.findOne({
			$or: [{ 'google._id': google._id } as Partial<User>],
		});

		const userGoogle: UserDocument = isExist
			? isExist
			: await this.userModel.create({
					_id: new Types.ObjectId().toHexString(),
					provider: Provider.google,
					createdAt,
					email,
					name: `${name} ${Math.random() * 1000000000}`,
					google,
			  });

		return await this.authService.createAuthorization(
			userGoogle.toObject(),
		);
	}
}
