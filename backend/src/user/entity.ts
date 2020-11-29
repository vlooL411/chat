import Contact, { ContactSchema } from 'src/contact/entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Provider, User as UserGQL } from 'src/graphql';
import { ObjectID, refChatID, unique } from 'src/models/props';
import { Authentication, SocialNetwork } from 'src/auth/entities';

@Schema()
export default class User implements UserGQL {
	@Prop(ObjectID) _id: string;
	@Prop(unique) name: string;
	@Prop() password?: string;
	@Prop(unique) email: string;

	@Prop({ default: Provider.auth })
	provider?: Provider;
	@Prop({ type: Authentication }) auth?: Authentication;
	@Prop({ type: SocialNetwork }) google?: SocialNetwork;
	@Prop({ type: SocialNetwork }) facebook?: SocialNetwork;

	@Prop() avatar?: string;
	@Prop() status?: string;

	@Prop({ type: Date }) createdAt: Date;
	@Prop({ type: Date }) dateLastOnline?: Date;

	@Prop({ type: [refChatID] })
	chats_id?: string[];
	@Prop({ type: [ContactSchema] })
	contacts?: Contact[];

	@Prop() isOnline?: boolean;
	@Prop() isOnlineMobile?: boolean;
	@Prop() isClosed?: boolean;
	@Prop() isVerified?: boolean;
	@Prop() isActivated?: boolean;
	@Prop() isLocked?: boolean;
	@Prop() isActive?: boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
