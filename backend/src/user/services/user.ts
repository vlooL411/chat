import { ApolloError } from 'apollo-server-express';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectID, UserSafe } from 'src/graphql';

import User, { UserDocument } from '../entity';

@Injectable()
export default class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	user = async (_id: ObjectID): Promise<UserSafe> =>
		await this.userModel.findOne({ _id }, [
			'_id',
			'name',
			'password',
			'email',
			'avatar',
			'status',
			'dateLastOnline',
		]);

	id = async (name: string, email: string): Promise<UserSafe> =>
		await this.userModel.findOne({ name, email }, '_id');

	current = async (userid: ObjectID): Promise<User> =>
		await this.userModel.findOne({ _id: userid });

	async userUpdateOnline(userid: ObjectID): Promise<string> {
		const { ok } = await this.userModel.updateOne({ _id: userid }, {
			dateLastOnline: new Date(),
		} as UserSafe);

		if (ok == 0) throw new ApolloError("User don't update online");

		return 'User update online';
	}
}
