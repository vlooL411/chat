import User, { UserSchema } from 'src/user/entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ChatResolver from './resolver';
import ChatService from './service';
import Chat, { ChatSchema } from './entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Chat.name, schema: ChatSchema },
			{ name: User.name, schema: UserSchema },
		]),
	],
	providers: [ChatService, ChatResolver],
})
export default class ChatModule {}
