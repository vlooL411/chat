import {
	fromPromise,
	gql,
	NextLink,
	Observable,
	Operation,
} from '@apollo/client';
import { Authentication, TokenType } from '@frontend/types';
import { initializeApollo } from 'apolloclient';

const QueryRefreshToken = gql`
	query refresh($refreshToken: Token!) {
		Refresh(refreshToken: $refreshToken) {
			accessToken
			refreshToken
		}
	}
`;

const query = (refreshToken: string): Promise<Authentication> =>
	initializeApollo()
		.query({
			query: QueryRefreshToken,
			variables: { refreshToken },
		})
		.then(({ data }) => data?.Refresh)
		.catch(e => console.error('Query refresh token', e));

const RefreshToken = (
	refreshToken: string,
	operation: Operation,
	forward: NextLink,
): Observable<unknown> =>
	fromPromise<Authentication>(query(refreshToken)).flatMap(auth => {
		if (!auth) return new Observable(() => null);

		const oldHeaders = operation.getContext()?.headers;

		const headers = { ...oldHeaders };
		headers[TokenType.Authentication] = auth?.accessToken;

		localStorage.setItem(TokenType.Authentication, JSON.stringify(auth));

		operation.setContext({ headers });

		return forward(operation);
	});

export default RefreshToken;
