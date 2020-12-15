import Chat, { ChatDocument } from 'src/chat/entity';
import User, { UserDocument } from 'src/user/entity';
import { Injectable } from '@nestjs/common';
import { Access, Contacts, Creater, ObjectID } from 'src/graphql';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import Contact from './entity';
import { AggregateFilter, AggregateLookUp, ContactProject } from './common';

@Injectable()
export default class ContactService {
	constructor(
		@InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	contact = async (userid: ObjectID): Promise<Contact> =>
		await AggregateLookUp(userid, this.userModel)
			.replaceRoot('$contacts')
			.unwind('$User')
			.project(ContactProject)
			.then(contacts => contacts.pop() as Contact);

	contacts = async (userid: ObjectID): Promise<Contact[]> =>
		await AggregateLookUp(userid, this.userModel)
			.replaceRoot('$contacts')
			.unwind('$User')
			.project(ContactProject)
			.then(contacts => contacts.map((contact: Contact) => contact));

	async findContacts(userid: ObjectID, text: string): Promise<Contacts> {
		const Existing: Contact[] = await AggregateLookUp(
			userid,
			this.userModel,
		)
			.match({
				$or: [
					{ 'contacts.User.name': { $regex: text, $options: 'i' } },
					{
						'contacts.whoIsContact': {
							$regex: text,
							$options: 'i',
						},
					},
				],
			})
			.replaceRoot('$contacts')
			.unwind('$User')
			.project(ContactProject)
			.then(contacts => contacts.map((contact: Contact) => contact));

		const contactUserID: ObjectID[] = await AggregateFilter(
			userid,
			this.userModel,
		)
			.group({ _id: '$contacts.userid' })
			.then(contacts => contacts.map((contact: Contact) => contact._id));

		contactUserID.push(userid);
		const Incoming: Contact[] = await this.userModel
			.aggregate()
			.match({
				_id: { $nin: contactUserID },
				name: { $regex: text, $options: 'i' },
				$or: [{ isClosed: false }, { isClosed: null }],
			})
			.addFields({
				userid: '$_id',
				createdAt: "Don't exist",
				User: {
					_id: '$_id',
					name: '$name',
					avatar: '$avatar',
					status: '$status',
					dateLastOnline: '$dateLastOnline',
				},
			})
			.project(ContactProject);

		return { Existing, Incoming };
	}

	async create(
		userid: ObjectID,
		contactid: ObjectID,
		title: string,
	): Promise<Contact | null> {
		const chat: Chat = {
			_id: new Types.ObjectId(),
			title,
			createdAt: new Date(),
			creaters_id: [userid, contactid],
			creater: Creater.Contact,
			access: Access.Private,
		};

		const contact: Contact = {
			_id: chat._id,
			createdAt: chat.createdAt,
			userid,
			whoIsContact: title,
		};

		await this.chatModel.insertMany([chat]);

		const { ok } = await this.userModel.updateOne(
			{ _id: { $or: [userid, contactid] } },
			{ $push: { chats_id: chat?._id, contacts: contact } as never },
		);

		return ok != 0 ? contact : null;
	}
}
