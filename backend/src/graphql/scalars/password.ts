import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, StringValueNode } from 'graphql';

@Scalar('Password', () => String)
export default class PasswordScalar implements CustomScalar<string, string> {
	description = 'Password custom scalar type';

	static check = (value: string): boolean => /^[\wа-яА-Я]{8,32}$/.test(value);

	parseValue = (value: string): string => {
		if (!PasswordScalar.check(value))
			throw new Error('Password parse error');

		return value;
	};
	serialize = (value: string): string => value;
	parseLiteral = ({ kind, value }: StringValueNode): string =>
		kind === Kind.STRING ? value : null;
}
