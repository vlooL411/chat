import AuthGuard from 'src/auth/guards';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ObjectID, UserSafe } from 'src/graphql';
import { CurrentUser } from 'src/auth/decorators';

import { UserService } from './services';

@Resolver('User')
export default class UserResolver {
	constructor(private userService: UserService) {}

	@AuthGuard()
	@Query()
	async User(@Args('id') id: ObjectID): Promise<UserSafe> {
		return await this.userService.user(id);
	}

	@AuthGuard()
	@Query()
	async UserCurrent(@CurrentUser() { _id }: UserSafe): Promise<UserSafe> {
		return await this.userService.current(_id);
	}

	@AuthGuard()
	@Query()
	async UserUpdateOnline(@CurrentUser() { _id }: UserSafe): Promise<string> {
		return await this.userService.userUpdateOnline(_id);
	}
}
