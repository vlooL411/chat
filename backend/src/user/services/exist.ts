import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocialNetwork } from 'src/auth/entities';
import { UserSafe } from 'src/graphql';

import User, { UserDocument } from '../entity';

@Injectable()
export default class ExistService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	exist = async (name: string, email: string): Promise<UserSafe | null> =>
		await this.userModel.findOne({ $or: [{ name }, { email }] });

	existGoogle = async (
		email: string,
		google: SocialNetwork,
	): Promise<UserSafe | null> =>
		await this.userModel.findOne({
			$or: [
				{ email },
				{ google: { _id: google._id } } as Partial<User>,
				{ google: { email: google.email } } as Partial<User>,
			],
		});
}
