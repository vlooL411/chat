import 'styles/globals.sass';

import Signin from 'components/Sign';
import useAuthentication from 'hooks/useAuthentication';
import { ApolloProvider } from '@apollo/client';
import { ReactElement } from 'react';
import { initializeApollo } from 'apolloclient';
import { ThemeProvider } from 'components/Theme';
import { AppProps } from 'next/app';

const { NEXTAUTH_URL_AUTH } = process.env;

const App = ({ Component, pageProps, router }: AppProps): ReactElement => {
	useAuthentication(router, NEXTAUTH_URL_AUTH);

	return (
		<ApolloProvider client={initializeApollo()}>
			<ThemeProvider>
				<Signin />
				<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	);
};

export default App;
