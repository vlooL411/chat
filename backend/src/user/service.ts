import PasswordScalar from 'src/graphql/scalars/password';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RegisterInput, UserSafe } from 'src/graphql';
import { genSaltSync, hashSync } from 'bcrypt';

import User, { UserDocument } from './entity';

@Injectable()
export default class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	user = async (_id: string): Promise<User> =>
		await this.userModel.findOne(
			{ _id },
			'_id name email image status dateLastOnline',
		);

	id = async (name: string, email: string): Promise<User> =>
		await this.userModel.findOne({ name, email }, '_id');

	current = async (userid: string): Promise<User> =>
		await this.userModel.findOne({ _id: userid });

	exist = async (name: string, email: string): Promise<UserSafe | null> =>
		await this.userModel.findOne(
			{ $or: [{ name }, { email }] },
			'_id name email',
		);

	async create({ name, email, password }: RegisterInput): Promise<User> {
		//#region Password
		if (!PasswordScalar.check(password)) throw new Error('Password wrong');

		const salt = await genSaltSync(10);
		const hash = await hashSync(password, salt);
		//#endregion

		const isExist = await this.exist(name, email);
		if (isExist) throw new Error('User exist');

		return await this.userModel.create({
			_id: new Types.ObjectId(),
			name,
			email,
			password: hash,
			createdAt: new Date(),
		});
	}

	async userUpdateOnline(userid: string): Promise<string> {
		const { ok } = await this.userModel.updateOne({ _id: userid }, {
			dateLastOnline: new Date(),
		} as User);

		if (ok == 0) throw new Error("User don't update online");

		return 'User update online';
	}
}
