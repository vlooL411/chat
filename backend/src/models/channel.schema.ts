import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import Message, { MessageSchema } from '../message/entity';
import { refUserID, required } from './props';

@Schema()
export class Channel {
	@Prop(refUserID)
	creaters_id: string;

	@Prop()
	creater: string;

	@Prop({ ...required, type: Date })
	date: Date;

	@Prop()
	title: string;

	@Prop()
	image: string;

	@Prop({ type: [refUserID] })
	users_id: string[];

	@Prop({ type: [MessageSchema] })
	messages: Message[];
}

export type ChannelDocument = Channel & Document;
export const ChannelSchema = SchemaFactory.createForClass(Channel);
