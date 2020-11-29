import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Contact as ContactSQL } from 'src/graphql';
import { ObjectID, required } from 'src/models/props';

@Schema()
export default class Contact implements ContactSQL {
	@Prop(ObjectID)
	_id: string;

	@Prop(ObjectID)
	userid: string;

	@Prop({ ...required, type: Date })
	date: Date;

	@Prop()
	whoIsContact: string;
}

export type ContactDocument = Contact & Document;
export const ContactSchema = SchemaFactory.createForClass(Contact);
