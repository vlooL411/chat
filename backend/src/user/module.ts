import AuthModule from 'src/auth/module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as Services from './services';
import UserResolver from './resolver';
import { UserMongooseModule } from './entity';

@Module({
	imports: [AuthModule, MongooseModule.forFeature([UserMongooseModule])],
	providers: [...Object.values(Services), UserResolver],
	exports: [...Object.values(Services), MongooseModule],
})
export default class UserModule {}
