import Message, { MessageSchema } from 'src/message/entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Access, Chat as ChatGQL, Creater } from 'src/graphql';
import { ObjectID, refUserID, required } from 'src/models/props';

@Schema()
export default class Chat implements ChatGQL {
	@Prop(ObjectID)
	_id: string;

	@Prop(required)
	title: string;

	@Prop()
	image?: string;

	@Prop({ ...required, type: Date })
	date: Date;

	@Prop({ type: [refUserID] })
	creaters_id: string[];

	@Prop({ type: Creater, required: true })
	creater: Creater;

	@Prop({ type: Access, required: true })
	access: Access;

	@Prop({ type: [refUserID] })
	users_id?: string[];

	@Prop({ type: MessageSchema })
	lastMessage?: Message;

	@Prop({ type: [MessageSchema] })
	messages?: Message[];
}

export type ChatDocument = Chat & Document;
export const ChatSchema = SchemaFactory.createForClass(Chat);
