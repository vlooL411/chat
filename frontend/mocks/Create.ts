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
	ObjectID,
	UserSafe,
} from '../generated/src/types';

export const numberRandom = (): string => (Math.random() * 100000).toString();
export const numberRandomMod = (max = 10): number =>
	Math.floor(Math.random() * max);

export const crtArray = <T>(length: number, crt: (i: number) => T): T[] =>
	Array.from({ length }, (_, i) => crt(i));

const { EMPTY_AVATAR_USER } = process.env;
const { EMPTY_AVATAR_CHAT } = process.env;

type GqlResult<T> = {
	request: GraphQLRequest;
	result: { data: T } | (() => { data: T });
};

export default class Create {
	static QueryResultQ = <T>(query: DocumentNode, data: T): GqlResult<T> =>
		Create.RequestResult({ query }, data);

	static RequestResult = <T>(
		request: GraphQLRequest,
		data: T,
	): GqlResult<T> => ({
		request,
		result: { data },
	});

	static QueryResultQF = <T>(query: DocumentNode, data: T): GqlResult<T> =>
		Create.RequestResultF({ query }, data);

	static RequestResultF = <T>(
		request: GraphQLRequest,
		data: T,
	): GqlResult<T> => ({
		request,
		result: () => ({ data }),
	});

	static userWithoutContacts = (
		_id: ObjectID = numberRandom(),
	): UserSafe => ({
		_id,
		email: 'email@email.email',
		name: `name ${_id}`,
		createdAt: new Date().toString(),
		chats_id: Create._ids(),
		dateLastOnline: new Date().toString(),
		avatar: EMPTY_AVATAR_USER,
		isClosed: true,
		isOnlineMobile: true,
		status: `status ${_id}`,
	});

	static user(_id: ObjectID = numberRandom()): UserSafe {
		const UserSafe: UserSafe = Create.userWithoutContacts(_id);
		UserSafe.contacts = Create.contacts(UserSafe);
		return UserSafe;
	}

	static message = (_id: ObjectID = numberRandom()): Message => ({
		_id,
		createdAt: new Date().toString(),
		userid: numberRandom(),
		attachments: [],
		isChange: true,
		isFavorite: true,
		isRead: true,
		isSend: true,
		text: 'text',
	});

	static chat = (
		_id: ObjectID = numberRandom(),
		length: number = numberRandomMod(),
	): Chat => ({
		_id,
		access: Access.Own,
		creater: Creater.Chat,
		creaters_id: Create._ids(),
		createdAt: new Date().toString(),
		title: `Title ${_id}`,
		image: EMPTY_AVATAR_CHAT,
		users_id: Create._ids(),
		lastMessage: Create.message(),
		messages: Create.messages(length),
	});

	static contact = (
		_id: ObjectID = numberRandom(),
		User: UserSafe = Create.user(),
	): Contact => ({
		_id,
		createdAt: new Date().toString(),
		userid: User._id,
		User,
		whoIsContact: `whoIsContact ${User._id}`,
	});

	static Messages = (
		chatid: ObjectID = numberRandom(),
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

	static users = (length: number = numberRandomMod()): UserSafe[] =>
		crtArray(length, () => Create.user());

	static messages = (length: number = numberRandomMod()): Message[] =>
		crtArray(length, () => Create.message());

	static chats = (length: number = numberRandomMod()): Chat[] =>
		crtArray(length, () => Create.chat());

	static messagesInTheChat = (length: number = numberRandomMod()): Chat[] =>
		crtArray(length, () => Create.chat(numberRandom(), 1));

	static contacts = (
		UserSafe: UserSafe = Create.userWithoutContacts(),
		length: number = numberRandomMod(),
	): Contact[] =>
		crtArray(length, () => Create.contact(numberRandom(), UserSafe));

	static contactsRandomUser = (
		length: number = numberRandomMod(),
	): Contact[] =>
		crtArray(length, () =>
			Create.contact(numberRandom(), Create.userWithoutContacts()),
		);

	static _ids = (length: number = numberRandomMod()): ObjectID[] =>
		crtArray(length, () => numberRandom());
}
