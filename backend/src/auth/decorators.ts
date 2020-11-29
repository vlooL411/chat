import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { Token, TokenType, User } from 'src/graphql';
import { verify } from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';

import AuthConfig from './config';

const validate = (token: Token): User => {
	try {
		return verify(token, AuthConfig().accessToken.secret) as User;
	} catch {
		throw new UnauthorizedException();
	}
};

export const CurrentUser = createParamDecorator(
	(_, context: ExecutionContext): User => {
		const ctx = GqlExecutionContext.create(context).getContext();

		const token = ctx?.headers[TokenType.authentication];
		return validate(token);
	},
);
