import { DefinitionsGeneratorOptions } from '@nestjs/graphql'

const Definitions: DefinitionsGeneratorOptions = {
	defaultScalarType: 'unknown',
	customScalarTypeMapping: {
		Date: 'Date',
		Password: 'string',
		Token: 'string',
	},
};

export default Definitions;
