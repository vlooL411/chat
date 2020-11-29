import { CustomScalar, Scalar } from '@nestjs/graphql';
import { IntValueNode, Kind } from 'graphql';

@Scalar('Date', () => Date)
export default class DateScalar implements CustomScalar<number, Date> {
	description = 'Date custom scalar type';

	parseValue = (value: number): Date => new Date(value);
	serialize = (value: Date): number => value.getTime();
	parseLiteral = ({ kind, value }: IntValueNode): Date =>
		kind === Kind.INT ? new Date(value) : null;
}
