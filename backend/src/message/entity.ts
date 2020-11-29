import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message as MessageGQL } from 'src/graphql';
import { ObjectID, refUserID, required } from 'src/models/props';

@Schema()
export default class Message implements MessageGQL {
	@Prop(ObjectID)
	_id: string;

	@Prop(refUserID)
	userid: string;

	@Prop(required)
	text: string;

	@Prop({ ...required, type: Date })
	date: Date;

	@Prop({ type: [String] })
	attachments: string[];

	@Prop()
	isSend: boolean;

	@Prop()
	isRead: boolean;

	@Prop()
	isChange: boolean;

	@Prop()
	isFavorite: boolean;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
