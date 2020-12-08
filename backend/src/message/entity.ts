import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message as MessageGQL, ObjectID } from 'src/graphql';
import { required } from 'src/models/options';
import { typeDate, typeObjectID } from 'src/models/types';

@Schema()
export default class Message implements MessageGQL {
	@Prop(typeObjectID) _id: ObjectID;
	@Prop(typeObjectID) userid: ObjectID;

	@Prop(required) text: string;
	@Prop(typeDate) createdAt: Date;

	@Prop({ type: [String] })
	attachments?: string[];

	@Prop() isSend?: boolean;
	@Prop() isRead?: boolean;
	@Prop() isChange?: boolean;
	@Prop() isFavorite?: boolean;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass<Message>(Message);
