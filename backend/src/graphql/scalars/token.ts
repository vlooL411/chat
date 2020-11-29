import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, StringValueNode } from 'graphql';

@Scalar('Token', () => String)
export default class TokenScalar implements CustomScalar<string, string> {
	description = 'Token custom scalar string';

	parseValue = (value: string): string => value;
	serialize = (value: string): string => value;
	parseLiteral = ({ kind, value }: StringValueNode): string =>
		kind === Kind.STRING ? value : null;
}
