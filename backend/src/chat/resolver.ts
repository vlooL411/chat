import { PubSub } from 'graphql-subscriptions';
import { Args, Context, ID, Resolver } from '@nestjs/graphql';
import { Mutation, Query, Subscription } from '@nestjs/graphql';
import { Chat } from 'src/graphql';

import ChatService from './service';

export enum ChatSubs {
	ADD_CHAT = 'ADD_CHAT',
	DELETE_CHAT = 'DELETE_CHAT',
}

@Resolver('Chat')
export default class ChatResolver {
	constructor(private chatService: ChatService) {}

	@Query()
	async Chat(@Args('chatid', ID) chatid: string): Promise<Chat> {
		return this.chatService.chat('userid', chatid);
	}

	@Query()
	async Chats(): Promise<Chat[]> {
		return this.chatService.chats('userid');
	}

	@Query()
	async FindChat(@Args('title') title: string): Promise<Chat[]> {
		return this.chatService.findChat('userid', title);
	}

	@Mutation()
	async CreateChat(
		@Context('pubsub') pubsub: PubSub,
		@Args('title') title: string,
	): Promise<string> {
		const AddChat = await this.chatService.create('userid', title);
		if (!AddChat) return "Chat don't created";

		await pubsub.publish(ChatSubs.ADD_CHAT, { AddChat });
		return 'Chat created';
	}

	@Mutation()
	async InviteChat(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid', ID) chatid: string,
	): Promise<string> {
		const AddChat = await this.chatService.invite('userid', chatid);
		if (!AddChat) return "You don't invited chat";

		await pubsub.publish(ChatSubs.ADD_CHAT, { AddChat });
		return 'You invited chat';
	}

	@Mutation()
	async LeaveChat(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid', ID) chatid: string,
	): Promise<string> {
		const DeleteChat = await this.chatService.leave('userid', chatid);
		if (DeleteChat) return "User don't leaved chat";

		await pubsub.publish(ChatSubs.DELETE_CHAT, { DeleteChat });
		return 'User leaved chat';
	}

	@Mutation()
	async RemoveChat(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid', ID) chatid: string,
	): Promise<string> {
		const DeleteChat = await this.chatService.remove('userid', chatid);
		if (DeleteChat) return "User don't removed chat";

		await pubsub.publish(ChatSubs.DELETE_CHAT, { DeleteChat });
		return 'User removed chat';
	}

	@Subscription()
	AddChat(@Context('pubsub') pubsub: PubSub) {
		return pubsub.asyncIterator(ChatSubs.ADD_CHAT);
	}

	@Subscription()
	async DeleteChat(@Context('pubsub') pubsub: PubSub) {
		return pubsub.asyncIterator(ChatSubs.DELETE_CHAT);
	}
}
