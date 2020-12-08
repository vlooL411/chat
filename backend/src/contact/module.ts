import AuthModule from 'src/auth/module';
import { ChatMongooseModule } from 'src/chat/entity';
import { UserMongooseModule } from 'src/user/entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ContactResolver from './resolver';
import ContactService from './service';

@Module({
	imports: [
		MongooseModule.forFeature([ChatMongooseModule, UserMongooseModule]),
		AuthModule,
	],
	providers: [ContactService, ContactResolver],
})
export default class ContactModule {}
