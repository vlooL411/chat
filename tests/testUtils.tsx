import { render, RenderResult } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ReactElement } from 'react';
import { ApolloProvider } from '@apollo/client';

import { initializeApollo } from '../apolloclient/client';

export default class Render<T> {
	mocks: MockedResponse<Record<string, T>>[];
	wrapper: ReactElement;
	constructor(children: ReactElement | ReactElement) {
		this.wrapper = children;
	}

	private Wrapper(wrapper: ReactElement): Render<T> {
		this.wrapper = wrapper;
		return this;
	}

	Mock = (mocks: MockedResponse<Record<string, T>>[]) =>
		this.Wrapper(<MockedProvider mocks={mocks}>{this.wrapper}</MockedProvider>);

	Apollo = () =>
		this.Wrapper(
			<ApolloProvider client={initializeApollo()}>
				{this.wrapper}
			</ApolloProvider>,
		);

	build = (): RenderResult => render(this.wrapper);
}

// re-export everything
export * from '@testing-library/react';

export { render, RenderResult };
