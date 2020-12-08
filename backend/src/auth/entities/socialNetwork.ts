import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SocialNetwork as SocialNetworkGQL } from 'src/graphql';
import { required, typeAuthentication } from 'src/models';

import Authentication from './authentication';

@Schema()
export default class SocialNetwork implements SocialNetworkGQL {
	@Prop(required) _id: string;
	@Prop(typeAuthentication) auth: Authentication;

	@Prop(required) givenName: string;
	@Prop(required) familyName: string;
	@Prop(required) middleName: string;
	@Prop(required) email: string;
}

export type SocialNetworkDocument = SocialNetwork & Document;
export const SocialNetworkSchema = SchemaFactory.createForClass<SocialNetwork>(
	SocialNetwork,
);
export const SocialNetworkMongooseModule: ModelDefinition = {
	name: SocialNetwork.name,
	schema: SocialNetworkSchema,
};
