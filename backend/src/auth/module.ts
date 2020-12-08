import UserModule from 'src/user/module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import * as Services from './services';
import * as Strategies from './strategies';
import AuthConfig from './config';
import AuthController from './controller';
import AuthResolver from './resolver';

@Module({
	imports: [
		UserModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({ useFactory: () => AuthConfig().accessToken }),
	],
	providers: [
		...Object.values(Strategies),
		...Object.values(Services),
		AuthResolver,
	],
	controllers: [AuthController],
	exports: [JwtModule],
})
export default class AuthModule {}
