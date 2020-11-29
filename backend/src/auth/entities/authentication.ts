import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Authentication as AuthenticationGQL, Token } from 'src/graphql';
import { required } from 'src/models/props';

@Schema()
export default class Authentication implements AuthenticationGQL {
	@Prop({ ...required, type: String })
	accessToken: Token;
	@Prop({ ...required, type: String })
	refreshToken: Token;
}

export type AuthenticationDocument = Authentication & Document;
export const AuthenticationSchema = SchemaFactory.createForClass(
	Authentication,
);
