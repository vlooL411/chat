import { Token } from 'src/graphql';

type TokenConfig = {
	secret: Token;
	expiresIn: string;
};

type TokenConfigOptions = {
	secret: Token;
	signOptions: {
		expiresIn: string;
	};
};

type Config = {
	accessToken: TokenConfigOptions;
	refreshToken: TokenConfig;
};

const crtToken = (secret: Token, expiresIn: string): TokenConfig => ({
	secret,
	expiresIn,
});

const AuthConfig = (): Config => {
	const { env } = process;

	return {
		accessToken: {
			secret: env.ACCESS_SECRET,
			signOptions: { expiresIn: '5m' },
		},
		refreshToken: crtToken(env.REFRESH_SECRET, '10m'),
	};
};

export default AuthConfig;
