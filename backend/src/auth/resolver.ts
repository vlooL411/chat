import {
	Authentication,
	LoginInput,
	RegisterInput,
	Token,
	UserSafe,
} from 'src/graphql';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import AuthService from './services/auth';
import { RegisterService } from './services';

@Resolver('Auth')
export default class AuthResolver {
	constructor(
		private authService: AuthService,
		private registerService: RegisterService,
	) {}

	@Query()
	async Login(@Args('input') input: LoginInput): Promise<Authentication> {
		return this.authService.login(input);
	}

	@Mutation()
	async Register(@Args('input') input: RegisterInput): Promise<UserSafe> {
		return this.registerService.register(input);
	}

	@Query()
	async Refresh(
		@Args('refreshToken') refreshToken: Token,
	): Promise<Authentication> {
		return this.authService.refresh(refreshToken);
	}
}
