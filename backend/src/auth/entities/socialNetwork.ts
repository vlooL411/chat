import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SocialNetwork as SocialNetworkGQL, Token } from 'src/graphql';
import { ObjectID, required } from 'src/models/props';

@Schema()
export default class SocialNetwork implements SocialNetworkGQL {
	@Prop(ObjectID)
	_id: string;
	@Prop({ ...required, type: String })
	accessToken: Token;
	@Prop({ ...required, type: String })
	refreshToken: Token;

	@Prop(required)
	givenName: string;
	@Prop(required)
	familyName: string;
	@Prop(required)
	middleName: string;
	@Prop(required)
	email: string;
}

export type SocialNetworkDocument = SocialNetwork & Document;
export const SocialNetworkSchema = SchemaFactory.createForClass(SocialNetwork);
