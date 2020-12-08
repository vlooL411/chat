import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { Token, TokenType, UserSafe } from 'src/graphql';
import { verify } from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';

import AuthConfig from './config';

const validate = (token: Token): UserSafe => {
	try {
		return verify(token, AuthConfig().accessToken.secret) as UserSafe;
	} catch {
		throw new UnauthorizedException();
	}
};

export const CurrentUser = createParamDecorator(
	(_, context: ExecutionContext): UserSafe => {
		const ctx = GqlExecutionContext.create(context).getContext();

		const token = ctx?.headers[TokenType.authentication];
		return validate(token);
	},
);
