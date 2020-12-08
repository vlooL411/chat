import AuthGuard from 'src/auth/guards';
import { ApolloError } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import { Args, Context, Resolver } from '@nestjs/graphql';
import { Mutation, Query, Subscription } from '@nestjs/graphql';
import { Chat, ObjectID, UserSafe } from 'src/graphql';
import { CurrentUser } from 'src/auth/decorators';

import ChatService from './service';

export enum ChatSubs {
	ADD_CHAT = 'ADD_CHAT',
	DELETE_CHAT = 'DELETE_CHAT',
}

@Resolver('Chat')
export default class ChatResolver {
	constructor(private chatService: ChatService) {}

	@AuthGuard()
	@Query()
	async Chat(
		@Args('chatid') chatid: ObjectID,
		@CurrentUser() { _id }: UserSafe,
	): Promise<Chat> {
		return this.chatService.chat(_id, chatid);
	}

	@AuthGuard()
	@Query()
	async Chats(@CurrentUser() { _id }: UserSafe): Promise<Chat[]> {
		return this.chatService.chats(_id);
	}

	@AuthGuard()
	@Query()
	async FindChat(
		@Args('title') title: string,
		@CurrentUser() { _id }: UserSafe,
	): Promise<Chat[]> {
		return this.chatService.findChat(_id, title);
	}

	@AuthGuard()
	@Mutation()
	async CreateChat(
		@Context('pubsub') pubsub: PubSub,
		@Args('title') title: string,
		@CurrentUser() { _id }: UserSafe,
	): Promise<string> {
		console.log(title);
		const AddChat = await this.chatService.create(_id, title);
		if (!AddChat) throw new ApolloError("Chat don't created");

		await pubsub.publish(ChatSubs.ADD_CHAT, { AddChat });
		return 'Chat created';
	}

	@AuthGuard()
	@Mutation()
	async InviteChat(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid') chatid: ObjectID,
		@CurrentUser() { _id }: UserSafe,
	): Promise<string> {
		const AddChat = await this.chatService.invite(_id, chatid);
		if (!AddChat) throw new ApolloError("You don't invited chat");

		await pubsub.publish(ChatSubs.ADD_CHAT, { AddChat });
		return 'You invited chat';
	}

	@AuthGuard()
	@Mutation()
	async LeaveChat(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid') chatid: ObjectID,
		@CurrentUser() { _id }: UserSafe,
	): Promise<string> {
		const DeleteChat = await this.chatService.leave(_id, chatid);
		if (DeleteChat) throw new ApolloError("User don't leaved chat");

		await pubsub.publish(ChatSubs.DELETE_CHAT, { DeleteChat });
		return 'User leaved chat';
	}

	@AuthGuard()
	@Mutation()
	async RemoveChat(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid') chatid: ObjectID,
		@CurrentUser() { _id }: UserSafe,
	): Promise<string> {
		const DeleteChat = await this.chatService.remove(_id, chatid);
		if (DeleteChat) throw new ApolloError("User don't removed chat");

		await pubsub.publish(ChatSubs.DELETE_CHAT, { DeleteChat });
		return 'User removed chat';
	}

	@Subscription()
	AddChat(@Context('pubsub') pubsub: PubSub): AsyncIterator<Chat> {
		return pubsub.asyncIterator(ChatSubs.ADD_CHAT);
	}

	@Subscription()
	DeleteChat(@Context('pubsub') pubsub: PubSub): AsyncIterator<Chat> {
		return pubsub.asyncIterator(ChatSubs.DELETE_CHAT);
	}
}
