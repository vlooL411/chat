import { DefinitionsGeneratorOptions } from '@nestjs/graphql';

// import DateScalar from './date';
// import PasswordScalar from './password';
// import TokenScalar from './token';

const Definitions: DefinitionsGeneratorOptions = {
	defaultScalarType: 'unknown',
	customScalarTypeMapping: {
		Date: 'Date',
		Password: 'string',
		Token: 'string',
	},
	// additionalHeader: ([
	// 	[DateScalar.name, 'date'],
	// 	[PasswordScalar.name, 'password'],
	// 	[TokenScalar.name, 'token'],
	// ] as [string, string][])
	// 	.map(([name, module]) => `import ${name} from './scalars/${module}';`)
	// 	.join('\n'),
};

export default Definitions;
