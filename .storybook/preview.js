import "../styles/globals.sass";
import "../styles/classes.sass";
import { Themes, ThemeContext } from "../pages/_app";
import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "../apolloclient/client";
import { Provider } from "next-auth/client";

export const decorators = [
  (Story) => {
    const [theme, setTheme] = useState(Themes.dark);

    return (
      <ApolloProvider client={initializeApollo()}>
        <Provider session={null}>
          <ThemeContext.Provider value={{ theme, toggleThemes: setTheme }}>
            <div className={theme}>
              <Story />
            </div>
          </ThemeContext.Provider>
        </Provider>
      </ApolloProvider>
    );
  },
];

export const parameters = {
  options: {
    storySort: (a, b) =>
      // We want the Welcome story at the top
      b[1].kind === "Welcome"
        ? 1
        : a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true }),
  },
};
