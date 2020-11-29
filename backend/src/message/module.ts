import Chat, { ChatSchema } from 'src/chat/entity';
import User, { UserSchema } from 'src/user/entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import MessageResolver from './resolver';
import MessageService from './service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Chat.name, schema: ChatSchema },
			{ name: User.name, schema: UserSchema },
		]),
	],
	providers: [MessageService, MessageResolver],
})
export default class MessageModule {}
