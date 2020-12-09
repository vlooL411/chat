import Message, { MessageSchema } from 'src/message/entity';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Access, Chat as ChatGQL, Creater, ObjectID } from 'src/graphql';
import { Ref, required, typeDate, typeObjectID } from 'src/models';

@Schema()
export default class Chat implements ChatGQL {
	@Prop(typeObjectID) _id: ObjectID;

	@Prop(required) title: string;
	@Prop() image?: string;

	@Prop(typeDate) createdAt: Date;

	@Prop({ type: Creater, required: true }) creater: Creater;
	@Prop({ type: Access, required: true }) access: Access;

	@Prop({ type: [{ type: Types.ObjectId, ref: Ref.User }], required: true })
	creaters_id: ObjectID[];
	@Prop({ type: [{ type: Types.ObjectId, ref: Ref.User }] })
	users_id?: ObjectID[];

	@Prop({ type: MessageSchema }) lastMessage?: Message;
	@Prop({ type: [MessageSchema] }) messages?: Message[];
}

export type ChatDocument = Chat & Document;
export const ChatSchema = SchemaFactory.createForClass<Chat>(Chat);
export const ChatMongooseModule: ModelDefinition = {
	name: Chat.name,
	schema: ChatSchema,
};
