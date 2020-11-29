import UserModule from 'src/user/module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import * as Strategies from './strategies';
import AuthConfig from './config';
import AuthController from './controller';
import AuthResolver from './resolver';
import AuthService from './service';

@Module({
	imports: [
		UserModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({ useFactory: () => AuthConfig().accessToken }),
	],
	providers: [AuthService, AuthResolver, ...Object.values(Strategies)],
	controllers: [AuthController],
	// exports: [JwtModule],
})
export default class AuthModule {}
