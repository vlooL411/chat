import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ExistService } from 'src/user/services';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongooseModule } from 'src/user/entity';

import * as Services from './services';
import * as Strategies from './strategies';
import AuthConfig from './config';
import AuthController from './controller';
import AuthResolver from './resolver';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({ useFactory: () => AuthConfig().accessToken }),
		MongooseModule.forFeature([UserMongooseModule]), //UserModule
	],
	providers: [
		...Object.values(Strategies),
		...Object.values(Services),
		ExistService, //UserModule
		AuthResolver,
	],
	controllers: [AuthController],
	exports: [JwtModule],
})
export default class AuthModule {}
