import { GraphQLRequest } from '@apollo/client';
import { DocumentNode } from 'graphql';
import {
	Access,
	Chat,
	Contact,
	Creater,
	InfoMore,
	Message,
	Messages,
	User,
} from 'generated/graphql-frontend';
import { ID } from 'apollographql/types';

export const numberRandom = (): string => (Math.random() * 100000).toString();
export const numberRandomMod = (max = 10): number =>
	Math.floor(Math.random() * max);

export const crtArray = <T>(length: number, crt: (i: number) => T) =>
	Array.from({ length }, (_, i) => crt(i));

const { EMPTY_AVATAR_USER } = process.env;
const { EMPTY_AVATAR_CHAT } = process.env;

export default class Create {
	static QueryResultQ = <T>(query: DocumentNode, data: T) =>
		Create.RequestResult({ query }, data);

	static RequestResult = <T>(request: GraphQLRequest, data: T) => ({
		request,
		result: { data },
	});

	static QueryResultQF = <T>(query: DocumentNode, data: T) =>
		Create.RequestResultF({ query }, data);

	static RequestResultF = <T>(request: GraphQLRequest, data: T) => ({
		request,
		result: () => ({ data }),
	});

	static userWithoutContacts(_id: ID = numberRandom()): User {
		const User: User = {
			_id,
			email: 'email@email.email',
			name: `name ${_id}`,
			password: 'password',
			chats_id: Create._ids(),
			dateLastOnline: new Date(),
			image: EMPTY_AVATAR_USER,
			isClosed: true,
			isOnlineMobile: true,
			status: `status ${_id}`,
		};
		return User;
	}

	static user(_id: ID = numberRandom()): User {
		const User: User = Create.userWithoutContacts(_id);
		User.contacts = Create.contacts(User);
		return User;
	}

	static message = (_id: ID = numberRandom()): Message => ({
		_id,
		date: new Date(),
		userid: numberRandom(),
		attachments: [],
		isChange: true,
		isFavorite: true,
		isRead: true,
		isSend: true,
		text: 'text',
	});

	static chat = (
		_id: ID = numberRandom(),
		length: number = numberRandomMod(),
	): Chat => ({
		_id,
		access: Access.Own,
		creater: Creater.Chat,
		creaters_id: Create._ids(),
		date: new Date(),
		title: `Title ${_id}`,
		image: EMPTY_AVATAR_CHAT,
		users_id: Create._ids(),
		lastMessage: Create.message(),
		messages: Create.messages(length),
	});

	static contact = (
		_id: ID = numberRandom(),
		User: User = Create.user(),
	): Contact => ({
		_id,
		date: new Date(),
		userid: User._id,
		User,
		whoIsContact: `whoIsContact ${User._id}`,
	});

	static Messages = (
		chatid: ID = numberRandom(),
		length: number = numberRandomMod(),
		size: number = numberRandomMod(),
	): Messages => ({
		Chat: Create.chat(chatid, length),
		InfoMore: Create.infoMore(size),
	});

	static infoMore = (size: number = numberRandomMod(100)): InfoMore => ({
		_id: numberRandom(),
		isEndDown: numberRandom(),
		isEndUp: numberRandom(),
		lastIndex: numberRandom(),
		size,
	});

	static users = (length: number = numberRandomMod()): User[] =>
		crtArray(length, () => Create.user());

	static messages = (length: number = numberRandomMod()): Message[] =>
		crtArray(length, () => Create.message());

	static chats = (length: number = numberRandomMod()): Chat[] =>
		crtArray(length, () => Create.chat());

	static messagesInTheChat = (length: number = numberRandomMod()): Chat[] =>
		crtArray(length, () => Create.chat(numberRandom(), 1));

	static contacts = (
		User: User = Create.userWithoutContacts(),
		length: number = numberRandomMod(),
	): Contact[] =>
		crtArray(length, () => Create.contact(numberRandom(), User));

	static contactsRandomUser = (
		length: number = numberRandomMod(),
	): Contact[] =>
		crtArray(length, () =>
			Create.contact(numberRandom(), Create.userWithoutContacts()),
		);

	static _ids = (length: number = numberRandomMod()): ID[] =>
		crtArray(length, () => numberRandom());
}
