import { DefinitionsGeneratorOptions } from '@nestjs/graphql';

const Definitions: DefinitionsGeneratorOptions = {
	defaultScalarType: 'unknown',
	customScalarTypeMapping: {
		Date: 'Date',
		Password: 'string',
		Token: 'string',
		ObjectID: 'Types.ObjectId',
	},
	additionalHeader: 'import { Types } from "mongoose"',
};

export default Definitions;
