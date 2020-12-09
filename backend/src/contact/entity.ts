import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Contact as ContactSQL, ObjectID } from 'src/graphql';
import { Ref, typeDate, typeObjectID } from 'src/models';

@Schema()
export default class Contact implements ContactSQL {
	@Prop(typeObjectID) _id: ObjectID;
	@Prop({ type: Types.ObjectId, ref: Ref.User }) userid: ObjectID;

	@Prop(typeDate) createdAt: Date;

	@Prop() whoIsContact?: string;
}

export type ContactDocument = Contact & Document;
export const ContactSchema = SchemaFactory.createForClass<Contact>(Contact);
