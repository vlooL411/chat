import { render, RenderResult } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { ReactElement } from 'react'
import { ApolloProvider } from '@apollo/client'

import { initializeApollo } from '../apolloclient/client'

// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

export const Apollo = (children: ReactElement) =>
  <ApolloProvider client={initializeApollo()} >{children}</ApolloProvider>;

export const ApolloRender = (children: ReactElement): RenderResult =>
  render(Apollo(children))

// return (
//   <ThemeProvider theme="light">
//     <TranslationProvider messages={defaultStrings}>
//       {children}
//     </TranslationProvider>
//   </ThemeProvider>
// )

export const Mocks = (mocks: MockedResponse<Record<string, any>>[], children: ReactElement): ReactElement =>
  <MockedProvider mocks={mocks}>{children}</MockedProvider>;

export const MocksRender = (mocks: MockedResponse<Record<string, any>>[], children: ReactElement): RenderResult =>
  render(Mocks(mocks, children))
export const ApolloMocksRender = (mocks: MockedResponse<Record<string, any>>[], children: ReactElement): RenderResult =>
  render(Apollo(Mocks(mocks, children)))

// re-export everything
export * from "@testing-library/react";

export { render }