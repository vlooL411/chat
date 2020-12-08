import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Authentication as AuthenticationGQL, Token } from 'src/graphql';
import { required } from 'src/models';

@Schema()
export default class Authentication implements AuthenticationGQL {
	@Prop(required) accessToken: Token;
	@Prop(required) refreshToken: Token;
}

export type AuthenticationDocument = Authentication & Document;
export const AuthenticationSchema = SchemaFactory.createForClass<Authentication>(
	Authentication,
);
