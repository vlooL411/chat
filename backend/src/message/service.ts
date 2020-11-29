import Chat, { ChatDocument } from 'src/chat/entity';
import User, { UserDocument } from 'src/user/entity';
import { Injectable } from '@nestjs/common';
import { Access, InfoMore, Message, Messages } from 'src/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export default class MessageService {
	constructor(
		@InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async messages(
		chatid: string,
		messageid: string,
		limit: number,
	): Promise<Messages> {
		const [{ index, size }]: {
			size: number;
			index?: number;
		}[] = await this.chatModel
			.aggregate()
			.match({ _id: new Types.ObjectId(chatid) })
			.project({
				index: {
					$indexOfArray: [
						'$messages._id',
						new Types.ObjectId(messageid),
					],
				},
				size: { $size: '$messages' },
			});

		let start;
		if (limit > 0) start = index < 0 ? size - limit + 1 : index;
		else start = (index < 0 ? 0 : index) + limit;

		const Limit = Math.abs(limit);
		const end = start < 0 ? (index < 0 ? start + Limit : index) : Limit;
		start = start < 0 ? 0 : start;

		const chat_s: Chat[] = await this.chatModel.aggregate([
			{ $match: { _id: new Types.ObjectId(chatid) } },
			{
				$project: {
					_id: true,
					firstMessage: { $arrayElemAt: ['$messages._id', 0] },
					lastMessage: { $arrayElemAt: ['$messages', -1] },
					messages: {
						$slice: ['$messages', start, end],
					},
				},
			},
		]);

		const chat = chat_s?.length > 0 ? chat_s[0] : null;
		const isEndUp = (chat as any)?.firstMessage as string;
		const isEndDown = chat?.lastMessage?._id;

		const InfoMore: InfoMore = {
			_id: chatid,
			size,
			isEndUp,
			isEndDown,
			lastIndex: messageid,
		};

		return { Chat: chat, InfoMore };
	}

	async findMessage(userid: string, text: string): Promise<Chat[]> {
		const { chats_id }: User = await this.userModel.findOne(
			{ _id: userid },
			'_id this.chatModel_id',
		);

		const chat_s: Chat[] = await this.chatModel
			.aggregate()
			.match({
				_id: { $in: chats_id },
				'messages.text': { $regex: text, $options: 'i' },
			})
			.project({
				title: true,
				date: true,
				creater: true,
				creaters_id: true,
				access: true,
				messages: {
					$filter: {
						input: '$messages',
						as: 'mes',
						cond: {
							$regexMatch: {
								input: '$$mes.text',
								regex: text,
								options: 'i',
							},
						},
					},
				},
			});

		return chat_s;
	}

	async send(
		userid: string,
		chatid: string,
		text: string,
	): Promise<Message | null> {
		const message: Message = {
			_id: new Types.ObjectId() as any,
			text,
			date: new Date(),
			userid,
		};

		const { ok } = await this.chatModel.updateOne(
			{
				_id: chatid,
				$or: [
					{ access: Access.Public },
					{ creaters_id: { $elemMatch: { $eq: userid } } },
					{ users_id: { $elemMatch: { $eq: userid } } },
				],
			},
			{ $push: { messages: message as never } },
		);

		return ok != 0 ? message : null;
	}

	async remove(
		userid: string,
		chatid: string,
		messageid: string,
	): Promise<Message | null> {
		const { ok } = await this.chatModel.updateOne(
			{
				_id: chatid,
				$or: [
					{ creaters_id: userid },
					{ messages: { $elemMatch: { _id: messageid, userid } } },
				],
			},
			{ $pull: { messages: { _id: messageid } as never } },
			{ multi: true },
		);
		return ok != 0 ? ({ _id: messageid } as Message) : null;
	}

	async change(
		chatid: string,
		messageid: string,
		text: string,
	): Promise<Message | null> {
		const message = {
			_id: messageid,
			text,
			isChange: true,
		} as Message;

		const { ok } = await this.chatModel.updateOne(
			{ _id: chatid, messages: { $elemMatch: { _id: messageid } } },
			{
				$set: {
					'messages.$.text': text,
					'messages.$.isChange': true,
				},
			},
		);

		return ok != 0 ? message : null;
	}
}
