import { Controller, Get, Req } from '@nestjs/common';
import { Authentication, UserSafe } from 'src/graphql';
import { Request } from 'express';

import AuthService from './service';
import { GoogleGuard } from './guards';

@Controller('auth')
export default class AuthController {
	constructor(private authService: AuthService) {}

	@Get('google')
	@GoogleGuard()
	google(): void {
		return;
	}

	@Get('google/callback')
	@GoogleGuard()
	async googleRedirect(
		@Req() req: Request & { user: UserSafe },
	): Promise<Authentication> {
		return await this.authService.registerGoogle(req?.user);
	}
}
