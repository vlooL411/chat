import { PubSub } from 'graphql-subscriptions';
import { Args, Context, ID, Int, Resolver } from '@nestjs/graphql';
import { Mutation, Query, Subscription } from '@nestjs/graphql';
import { Chat, Messages } from 'src/graphql';

import Message from './entity';
import MessageService from './service';

export enum MessageSubs {
	ADD_MESSAGE = 'ADD_MESSAGE',
	SWAP_MESSAGE = 'SWAP_MESSAGE',
	DELETE_MESSAGE = 'DELETE_MESSAGE',
}

@Resolver('Message')
export default class MessageResolver {
	constructor(private messageService: MessageService) {}

	@Query()
	async Messages(
		@Args('chatid', ID!) chatid: string,
		@Args('messageid', ID) messageid: string,
		@Args('limit', Int) limit: number,
		@Args('isIncoming') isIncoming: boolean,
	): Promise<Messages> {
		return await this.messageService.messages(chatid, messageid, limit);
	}

	@Query()
	async FindMessage(@Args('text') text: string): Promise<Chat[]> {
		return await this.messageService.findMessage('userid', text);
	}

	@Mutation()
	async SendMessage(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid', ID!) chatid: string,
		@Args('text') text: string,
	): Promise<string> {
		const AddMessage = { _id: chatid, text }; //await this.messageService.send('userid', chatid, text)
		if (!AddMessage) return "Message don't sent";

		await pubsub.publish(MessageSubs.ADD_MESSAGE, { AddMessage });
		return 'Message sent';
	}

	@Mutation()
	async ChangeMessage(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid', ID!) chatid: string,
		@Args('text') text: string,
	): Promise<string> {
		const SwapMessage = await this.messageService.change(
			'userid',
			chatid,
			text,
		);
		if (!SwapMessage) return "Message don't changed";

		await pubsub.publish(MessageSubs.SWAP_MESSAGE, { SwapMessage });
		return 'Message changed';
	}

	@Mutation()
	async RemoveMessage(
		@Context('pubsub') pubsub: PubSub,
		@Args('chatid', ID!) chatid: string,
		@Args('messageid', ID!) messageid: string,
	): Promise<string> {
		const DeleteMessage = await this.messageService.remove(
			'userid',
			chatid,
			messageid,
		);
		if (!DeleteMessage) return "Message don't removed";

		await pubsub.publish(MessageSubs.DELETE_MESSAGE, { DeleteMessage });
		return 'Message removed';
	}

	@Subscription()
	AddMessage(@Context('pubsub') pubsub: PubSub) {
		return pubsub.asyncIterator(MessageSubs.ADD_MESSAGE);
	}

	@Subscription()
	SwapMessage(@Context('pubsub') pubsub: PubSub) {
		return pubsub.asyncIterator(MessageSubs.SWAP_MESSAGE);
	}

	@Subscription()
	DeleteMessage(@Context('pubsub') pubsub: PubSub) {
		return pubsub.asyncIterator(MessageSubs.DELETE_MESSAGE);
	}
}
