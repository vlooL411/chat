import User, { UserDocument } from 'src/user/entity';
import { Injectable } from '@nestjs/common';
import { Access, Creater } from 'src/graphql';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import Chat, { ChatDocument } from './entity';

@Injectable()
export default class ChatService {
	constructor(
		@InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async chat(userid: string, chatid: string): Promise<Chat> {
		const chat = await this.chatModel.findOne(
			{
				_id: chatid,
				$or: [
					{ access: Access.Public },
					{ creaters_id: { $elemMatch: { $eq: userid } } },
					{ users_id: { $elemMatch: { $eq: userid } } },
				],
			},
			'_id title image date creater creaters_id access',
		);

		/* if (chat) {
          switch (chat?.access) {
            case Access.Private:
              return null;
              break;
          }
        } */
		return chat;
	}

	async chats(userid: string): Promise<Chat[]> {
		const { chats_id } = await this.userModel.findOne(
			{ _id: userid },
			'chats_id',
		);

		return await this.chatModel
			.aggregate()
			.match({ _id: { $in: chats_id } })
			.project({
				_id: true,
				date: true,
				title: true,
				creater: true,
				creaters_id: true,
				access: true,
				lastMessage: { $arrayElemAt: ['$messages', -1] },
			});
	}

	findChat = async (userid: string, title: string): Promise<Chat[]> =>
		await this.chatModel
			.aggregate()
			.match({
				title: { $regex: title, $options: 'i' },
				$or: [
					{ creater: { $ne: Creater.Contact } },
					{ creaters_id: { $elemMatch: { $eq: userid } } },
				],
				access: { $nin: [Access.Private, Access.Own] },
			})
			.project({
				_id: true,
				date: true,
				title: true,
				creater: true,
				creaters_id: true,
				access: true,
				lastMessage: { $arrayElemAt: ['$messages', -1] },
			});

	async create(userid: string, title: string): Promise<Chat | null> {
		const chat: Chat = {
			_id: new Types.ObjectId() as any,
			title,
			date: new Date(),
			creaters_id: [userid],
			creater: Creater.Chat,
			access: Access.Public,
		};

		const chats = await this.chatModel.insertMany([chat]);

		const chatPop = chats?.pop();

		const { ok } = await this.userModel.updateOne(
			{ _id: userid },
			{
				$push: {
					chats_id: chat._id as never,
				},
			},
		);

		return ok != 0 ? chatPop : null;
	}

	async invite(userid: string, chatid: string): Promise<Chat | null> {
		const { okUser } = await this.userModel.updateOne(
			{ _id: userid },
			{ $addToSet: { chats_id: chatid as never } },
		);

		if (okUser == 0) return null;

		const { ok: okChat } = await this.chatModel.updateOne(
			{ _id: chatid },
			{ $addToSet: { users_id: userid as never } },
		);

		if (okChat == 0) return null;

		return await this.chatModel.findOne({ _id: chatid });
	}

	async leave(userid: string, chatid: string): Promise<Chat | null> {
		const { okUser } = await this.userModel.updateOne(
			{ _id: userid },
			{ $pull: { chats_id: chatid as never } },
			{ multi: true },
		);

		if (okUser == 0) return null;

		const { ok: okChat } = await this.chatModel.updateOne(
			{ _id: chatid },
			{ $pull: { users_id: userid as never } },
			{ multi: true },
		);

		if (okChat == 0) return null;

		return { _id: chatid } as Chat;
	}

	async remove(userid: string, chatid: string): Promise<Chat | null> {
		const { deletedCount } = await this.chatModel.deleteOne({
			_id: chatid,
			creaters_id: { $elemMatch: { $eq: userid } },
		});

		return deletedCount > 0 ? ({ _id: chatid } as Chat) : null;
	}
}
