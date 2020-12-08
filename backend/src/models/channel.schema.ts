import Message, { MessageSchema } from 'src/message/entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Creater } from 'src/graphql';

import { typeDate, typeObjectID } from '.';

@Schema()
export class Channel {
	@Prop({ type: [typeObjectID] }) creaters_id: string;
	@Prop({ type: [typeObjectID] }) users_id: string[];

	@Prop({ type: Creater, required: true }) creater: string;

	@Prop(typeDate)
	date: Date;

	@Prop() title: string;
	@Prop() image: string;

	@Prop({ type: [MessageSchema] })
	messages: Message[];
}

export type ChannelDocument = Channel & Document;
export const ChannelSchema = SchemaFactory.createForClass(Channel);
