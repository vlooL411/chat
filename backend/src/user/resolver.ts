import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/graphql';

import UserService from './service';

@Resolver('User')
export default class UserResolver {
	constructor(private userService: UserService) {}

	@Query()
	async User(@Args('id', ID) id: string): Promise<User> {
		return await this.userService.user(id);
	}

	@Query()
	async UserID(
		@Args('name') name: string,
		@Args('email') email: string,
	): Promise<User> {
		return await this.userService.id(name, email);
	}

	@Query()
	async UserCurrent(): Promise<User> {
		return await this.userService.current('userid');
	}

	@Query()
	async UserUpdateOnline(): Promise<string> {
		return await this.userService.userUpdateOnline('userid');
	}
}
