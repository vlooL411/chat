// eslint-disable-next-line @typescript-eslint/no-var-requires
const withSASS = require('@zeit/next-sass')();

module.exports = { withSASS };

const { env } = process;

module.exports.env = {
	PORT: env.PORT,
	HOSTNAME: env.HOSTNAME,
	HOST: env.HOST,
	HOST_API: env.HOST_API,

	//GRAPHQL
	PORT_GRAPHQL: env.PORT_GRAPHQL,
	GRAPHQL: env.GRAPHQL,
	GRAPHQLSUB: env.GRAPHQLSUB,
	HOST_GRAPHQL: env.HOST_GRAPHQL,
	HOST_GRAPHGQLSUB: env.HOST_GRAPHGQLSUB,

	//Sign icon
	ICON_GOOGLE: env.ICON_GOOGLE,

	//Empty img
	EMPTY_AVATAR_USER: env.EMPTY_AVATAR_USER,
	EMPTY_AVATAR_CHAT: env.EMPTY_AVATAR_CHAT,

	//auth
	NEXTAUTH_URL: env.NEXTAUTH_URL,
	NEXTAUTH_URL_AUTH: env.NEXTAUTH_URL_AUTH,
};
