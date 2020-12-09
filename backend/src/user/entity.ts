import Contact, { ContactSchema } from 'src/contact/entity';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectID, Provider, User as UserGQL } from 'src/graphql';
import { Ref, typeDate, typeObjectID, unique } from 'src/models';
import { Authentication, SocialNetwork } from 'src/auth/entities';

@Schema()
export default class User implements UserGQL {
	@Prop(typeObjectID) _id: ObjectID;
	@Prop(unique) name: string;
	@Prop() password?: string;
	@Prop(unique) email: string;

	@Prop({ default: Provider.auth }) provider?: Provider;
	@Prop({ type: Types.Subdocument }) auth?: Authentication;
	@Prop({ type: Types.Subdocument }) google?: SocialNetwork;
	@Prop({ type: Types.Subdocument }) facebook?: SocialNetwork;

	@Prop() avatar?: string;
	@Prop() status?: string;

	@Prop(typeDate) createdAt: Date;
	@Prop({ type: Date }) dateLastOnline?: Date;

	@Prop({ type: [{ type: Types.ObjectId, ref: Ref.Chat }] })
	chats_id?: ObjectID[];
	@Prop({ type: [ContactSchema] }) contacts?: Contact[];

	@Prop() isOnline?: boolean;
	@Prop() isOnlineMobile?: boolean;
	@Prop() isClosed?: boolean;
	@Prop() isVerified?: boolean;
	@Prop() isActivated?: boolean;
	@Prop() isLocked?: boolean;
	@Prop() isActive?: boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass<User>(User);
export const UserMongooseModule: ModelDefinition = {
	name: User.name,
	schema: UserSchema,
};
