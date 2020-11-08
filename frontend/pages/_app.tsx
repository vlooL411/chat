import 'styles/globals.sass'
import 'styles/classes.sass'

import Signin from 'components/Sign'
import { Provider } from 'next-auth/client'
import { ApolloProvider } from '@apollo/client'
import { ReactElement } from 'react'
import { initializeApollo } from '@chat/apolloclient'
import { ThemeProvider } from 'components/Theme'

export enum Themes {
  light = 'light',
  dark = 'dark'
}

const { NEXTAUTH_URL } = process.env
const { NEXTAUTH_URL_SESSION } = process.env

const App = ({ Component, pageProps }): ReactElement =>
  <ApolloProvider client={initializeApollo()}>
    <ThemeProvider>
      <Provider
        session={pageProps?.session ?? null}
        options={{ basePath: NEXTAUTH_URL_SESSION, baseUrl: NEXTAUTH_URL }}>
        <Signin />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  </ApolloProvider >

export default App