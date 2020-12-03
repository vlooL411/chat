import UserService from 'src/user/service';
import User, { UserDocument } from 'src/user/entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
	Authentication,
	LoginInput,
	Provider,
	RegisterInput,
	Token,
	UserSafe,
} from 'src/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { compareSync } from 'bcryptjs';

import AuthConfig from './config';

@Injectable()
export default class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async validate({ name, password }: LoginInput): Promise<UserSafe> {
		const user = await this.userModel.findOne({ name });

		if (!user) throw new Error('User is not registered');

		if (!(await compareSync(password, user.password)))
			throw new UnauthorizedException();

		if (user) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user.toObject();
			return result;
		}

		return null;
	}

	private async createAuthorization(user: UserSafe): Promise<Authentication> {
		if (!user) throw new Error('User data missing');

		const { _id, name, email, createdAt } = user;
		const userToken: UserSafe = { _id, name, email, createdAt };

		const accessToken = await this.jwtService.signAsync(userToken);
		const refreshToken = await this.jwtService.signAsync(
			userToken,
			AuthConfig().refreshToken,
		);

		return { accessToken, refreshToken };
	}

	async login(input: LoginInput): Promise<Authentication> {
		const user = await this.validate(input);
		return this.createAuthorization(user);
	}

	async register(input: RegisterInput): Promise<UserSafe> {
		const user = await this.userService.create(input);
		return user;
	}

	async registerGoogle(user: UserSafe): Promise<Authentication> {
		if (!user || !user.google || user._id != null) return;
		const { createdAt, email, name, google } = user;

		const userGoogle = await this.userModel.create({
			_id: new Types.ObjectId().toHexString(),
			provider: Provider.google,
			createdAt,
			email,
			name: `${name} ${Math.random() * 1000000000}`,
			google,
		});

		return await this.createAuthorization(userGoogle.toObject());
	}

	async refresh(refreshToken: Token): Promise<Authentication> {
		try {
			const refresh = await this.jwtService.verifyAsync(
				refreshToken,
				AuthConfig().refreshToken,
			);

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { iat, exp, ...user } = refresh;
			return await this.createAuthorization(user);
		} catch {
			throw new Error(`Refresh token wrong`);
		}
	}
}
