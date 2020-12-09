import '../../styles/globals.sass';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../../apolloclient';
import { ThemeProvider } from '../../components/Theme';

export const decorators = [
	Story => (
		<ApolloProvider client={initializeApollo()}>
			<ThemeProvider className='index'>
				<Story />
			</ThemeProvider>
		</ApolloProvider>
	),
];

export const parameters = {
	options: {
		storySort: (a, b) =>
			// We want the Welcome story at the top
			b[1].kind === 'Welcome'
				? 1
				: a[1].kind === b[1].kind
				? 0
				: a[1].id.localeCompare(b[1].id, { numeric: true }),
	},
};
