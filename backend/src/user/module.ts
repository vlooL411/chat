import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import UserResolver from './resolver';
import UserService from './service';
import User, { UserSchema } from './entity';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	providers: [UserService, UserResolver],
	exports: [MongooseModule, UserService],
})
export default class UserModule {}
