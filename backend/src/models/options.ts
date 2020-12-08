import { PropOptions } from '@nestjs/mongoose';

export const required: PropOptions = { required: true };
export const unique: PropOptions = { ...required, unique: true };
