import Chat from 'src/chat/entity';
import User from 'src/user/entity';
import { Types } from 'mongoose';
import { PropOptions } from '@nestjs/mongoose';

export const required: PropOptions = { required: true };
export const unique: PropOptions = { ...required, unique: true };
export const ObjectID: PropOptions = { type: Types.ObjectId, ...required };
export const refUserID: PropOptions = { ref: User?.name, ...ObjectID };
export const refChatID: PropOptions = { ref: Chat?.name, ...ObjectID };
