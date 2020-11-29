import {
	fromPromise,
	gql,
	NextLink,
	Observable,
	Operation,
} from '@apollo/client';
import { Authorization, TokenType } from '@frontend/types';
import { initializeApollo } from 'apolloclient';

const QueryRefreshToken = gql`
	query refresh($refreshToken: Token) {
		Refresh(refreshToken: $refreshToken) {
			accessToken
			refreshToken
		}
	}
`;

const query = (refreshToken: string) =>
	initializeApollo()
		.query({
			query: QueryRefreshToken,
			variables: { refreshToken },
		})
		.then(({ data }) => data.Refresh)
		.catch(() => localStorage.clear());

const RefreshToken = (
	refreshToken: string,
	operation: Operation,
	forward: NextLink,
): Observable<unknown> =>
	fromPromise<Authorization>(query(refreshToken)).flatMap(data => {
		if (!data) return new Observable(() => null);

		const oldHeaders = operation.getContext()?.headers;

		const headers = { ...oldHeaders };
		headers[TokenType.Authorization] = data?.accessToken;

		localStorage.setItem(TokenType.Authorization, JSON.stringify(data));

		operation.setContext({ headers });

		return forward(operation);
	});

export default RefreshToken;
