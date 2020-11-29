import { TokenType } from 'src/graphql';
import {
	Authentication,
	LoginInput,
	RegisterInput,
	Token,
	UserSafe,
} from 'src/graphql';
import { Req } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import AuthService from './service';
import { GoogleGuard } from './guards';

@Resolver('Auth')
export default class AuthResolver {
	constructor(private authService: AuthService) {}

	@Query()
	async Login(@Args('input') input: LoginInput): Promise<Authentication> {
		return this.authService.login(input);
	}

	@Mutation()
	async Register(@Args('input') input: RegisterInput): Promise<UserSafe> {
		return this.authService.register(input);
	}

	@Query()
	async Refresh(
		@Args('refreshToken') refreshToken: Token,
	): Promise<Authentication> {
		return this.authService.refresh(refreshToken);
	}
}
