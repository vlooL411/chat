import "../styles/globals.sass"
import "../styles/classes.sass"
import { Provider } from 'next-auth/client'
import { initializeApollo } from "../apolloclient/client"
import Signin from "../components/Sign"
import { ApolloProvider } from "@apollo/client"
import { ReactElement, useState, createContext } from "react"

const { RUN_APOLLO_SERVER } = process.env;
//TODO try change
//need for run apollo server
(async () => {
  await fetch(RUN_APOLLO_SERVER)
}).call(null)

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
  const [theme, setTheme] = useState(Themes.dark)
  const toggleThemes = (theme: Themes) => setTheme(theme)

  return <>
    <ApolloProvider client={initializeApollo()} >
      <ThemeContext.Provider value={{ theme, toggleThemes }}>
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