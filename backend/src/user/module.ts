import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as Services from './services';
import UserResolver from './resolver';
import { UserMongooseModule } from './entity';

@Module({
	imports: [MongooseModule.forFeature([UserMongooseModule])],
	providers: [...Object.values(Services), UserResolver],
	exports: [...Object.values(Services), MongooseModule],
})
export default class UserModule {}
