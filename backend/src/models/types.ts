import { Types } from 'mongoose';
import { PropOptions } from '@nestjs/mongoose';
import { AuthenticationSchema } from 'src/auth/entities';

import { required } from './options';

//here only required

export const typeObjectID: PropOptions = {
	type: Types.ObjectId,
	...required,
};

export const typeAuthentication: PropOptions = {
	type: AuthenticationSchema,
	...required,
};

export const typeDate: PropOptions = {
	type: Date,
	...required,
};
