import AuthModule from 'src/auth/module';
import { UserMongooseModule } from 'src/user/entity';
import { ChatMongooseModule } from 'src/chat/entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import MessageResolver from './resolver';
import MessageService from './service';

@Module({
	imports: [
		MongooseModule.forFeature([ChatMongooseModule, UserMongooseModule]),
		AuthModule,
	],
	providers: [MessageService, MessageResolver],
})
export default class MessageModule {}
