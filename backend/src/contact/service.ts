import Chat, { ChatDocument } from 'src/chat/entity';
import User, { UserDocument } from 'src/user/entity';
import { Injectable } from '@nestjs/common';
import { Access, Contact, Contacts, Creater } from 'src/graphql';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { AggregateFilter, AggregateLookUp, ContactProject } from './common';

@Injectable()
export default class ContactService {
	constructor(
		@InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	contact = async (userid: string): Promise<Contact> =>
		await AggregateLookUp(userid, this.userModel)
			.replaceRoot('$contacts')
			.unwind('$User')
			.project(ContactProject)
			.then(contacts => contacts.pop() as Contact);

	contacts = async (userid: string): Promise<Contact[]> =>
		await AggregateLookUp(userid, this.userModel)
			.replaceRoot('$contacts')
			.unwind('$User')
			.project(ContactProject)
			.then(contacts => contacts.map((contact: Contact) => contact));

	async findContacts(userid: string, text: string): Promise<Contacts> {
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

		const contactUserID: string[] = await AggregateFilter(
			userid,
			this.userModel,
		)
			.group({
				_id: '$contacts.userid',
			})
			.then(contacts => contacts.map((contact: Contact) => contact._id));

		contactUserID.push(new Types.ObjectId(userid).toHexString());
		const Incoming: Contact[] = await this.userModel
			.aggregate()
			.match({
				_id: { $nin: contactUserID },
				name: { $regex: text, $options: 'i' },
				$or: [{ isClosed: false }, { isClosed: null }],
			})
			.addFields({
				userid: '$_id',
				date: "Don't exist",
				User: {
					_id: '$_id',
					name: '$name',
					image: '$image',
					status: '$status',
					dateLastOnline: '$dateLastOnline',
				},
			})
			.project(ContactProject);

		return { Existing, Incoming };
	}

	async create(
		userid: string,
		contactid: string,
		title: string,
	): Promise<Contact | null> {
		const chat: Chat = {
			_id: new Types.ObjectId().toHexString(),
			title,
			date: new Date(),
			creaters_id: [userid, contactid],
			creater: Creater.Contact,
			access: Access.Private,
		};

		const contact: Contact = {
			_id: chat._id,
			date: chat.date,
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
