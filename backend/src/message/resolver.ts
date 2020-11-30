import AuthGuard from 'src/auth/guards';
import { PubSub } from 'graphql-subscriptions';
import { Args, Context, ID, Int, Resolver } from '@nestjs/graphql';
import { Mutation, Query, Subscription } from '@nestjs/graphql';
import { Chat, Message, Messages, UserSafe } from 'src/graphql';
import { CurrentUser } from 'src/auth/decorators';

import MessageService from './service';

export enum MessageSubs {
	ADD_MESSAGE = 'ADD_MESSAGE',
	SWAP_MESSAGE = 'SWAP_MESSAGE',
	DELETE_MESSAGE = 'DELETE_MESSAGE',
}

@Resolver('Message')
export default class MessageResolver {
	constructor(private messageService: MessageService) {}

	@AuthGuard()
	@Query()
	async Messages(
		@Args('chatid', ID!) chatid: string,
		@Args('messageid', ID) messageid: string,
		@Args('limit', Int) limit: number,
		@Args('isIncoming') isIncoming: boolean,
	): Promise<Messages> {
		return await this.messageService.messages(chatid, messageid, limit);
	}

	@AuthGuard()
	@Query()
	async FindMessage(@Args('text') text: string): Promise<Chat[]> {
		return await this.messageService.findMessage('userid', text);
	}

	@AuthGuard()
	@Mutation()
	async SendMessage(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid', ID!) chatid: string,
		@Args('text') text: string,
		@CurrentUser() { _id }: UserSafe,
	): Promise<string> {
		const AddMessage = await this.messageService.send(_id, chatid, text);
		if (!AddMessage) throw new Error("Message don't sent");

		await pubsub.publish(MessageSubs.ADD_MESSAGE, { AddMessage });
		return 'Message sent';
	}

	@AuthGuard()
	@Mutation()
	async ChangeMessage(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid', ID!) chatid: string,
		@Args('text') text: string,
		@CurrentUser() { _id }: UserSafe,
	): Promise<string> {
		const SwapMessage = await this.messageService.change(_id, chatid, text);
		if (!SwapMessage) throw new Error("Message don't changed");

		await pubsub.publish(MessageSubs.SWAP_MESSAGE, { SwapMessage });
		return 'Message changed';
	}

	@AuthGuard()
	@Mutation()
	async RemoveMessage(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid', ID!) chatid: string,
		@Args('messageid', ID!) messageid: string,
		@CurrentUser() { _id }: UserSafe,
	): Promise<string> {
		const DeleteMessage = await this.messageService.remove(
			_id,
			chatid,
			messageid,
		);
		if (!DeleteMessage) throw new Error("Message don't removed");

		await pubsub.publish(MessageSubs.DELETE_MESSAGE, { DeleteMessage });
		return 'Message removed';
	}

	@Subscription()
	AddMessage(@Context('pubsub') pubsub: PubSub): AsyncIterator<Message> {
		return pubsub.asyncIterator(MessageSubs.ADD_MESSAGE);
	}

	@Subscription()
	SwapMessage(@Context('pubsub') pubsub: PubSub): AsyncIterator<Message> {
		return pubsub.asyncIterator(MessageSubs.SWAP_MESSAGE);
	}

	@Subscription()
	DeleteMessage(@Context('pubsub') pubsub: PubSub): AsyncIterator<Message> {
		return pubsub.asyncIterator(MessageSubs.DELETE_MESSAGE);
	}
}