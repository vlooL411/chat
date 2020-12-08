import { Controller, Get, Req } from '@nestjs/common';
import { Authentication, UserSafe } from 'src/graphql';

import { GoogleGuard } from './guards';
import { RegisterService } from './services';

@Controller('auth')
export default class AuthController {
	constructor(private registerService: RegisterService) {}

	@Get('google')
	@GoogleGuard()
	google(): void {
		return;
	}

	@Get('google/callback')
	@GoogleGuard()
	async googleRedirect(
		@Req() req: { user: UserSafe },
	): Promise<Authentication> {
		return await this.registerService.registerGoogle(req?.user);
	}
}
