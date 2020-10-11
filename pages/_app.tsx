import 'styles/globals.sass'
import 'styles/classes.sass'

import Signin from 'components/Sign'
import { Provider } from 'next-auth/client'
import { ApolloProvider } from '@apollo/client'
import { createContext, ReactElement, useState } from 'react'
import { initializeApollo } from 'apolloclient/client'

export enum Themes {
  light = 'light',
  dark = 'dark'
}

type ThemeProps = {
  theme: Themes
  toggleThemes: (theme: Themes) => void
}

export const ThemeContext = createContext<ThemeProps>({ theme: Themes.dark, toggleThemes: null })

const App = ({ Component, pageProps }): ReactElement => {
  const [theme, setTheme] = useState<Themes>(Themes.dark)

  return <>
    <ApolloProvider client={initializeApollo()} >
      <ThemeContext.Provider value={{ theme, toggleThemes: setTheme }}>
        <Provider session={pageProps.session}>
          <div className={theme}>
            <Signin />
            <Component {...pageProps} />
          </div>
        </Provider>
      </ThemeContext.Provider>
    </ApolloProvider >
  </>
}

export default App