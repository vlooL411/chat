import Chat, { ChatSchema } from 'src/chat/entity';
import User, { UserSchema } from 'src/user/entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ContactResolver from './resolver';
import ContactService from './service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Chat.name, schema: ChatSchema },
			{ name: User.name, schema: UserSchema },
		]),
	],
	providers: [ContactService, ContactResolver],
})
export default class ContactModule {}
