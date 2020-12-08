import AuthModule from 'src/auth/module';
import { UserMongooseModule } from 'src/user/entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ChatResolver from './resolver';
import ChatService from './service';
import { ChatMongooseModule } from './entity';

@Module({
	imports: [
		MongooseModule.forFeature([ChatMongooseModule, UserMongooseModule]),
		AuthModule,
	],
	providers: [ChatService, ChatResolver],
})
export default class ChatModule {}
