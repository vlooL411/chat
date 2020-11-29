const path = require('path');
const join = relativePath => path.join(__dirname, `../${relativePath}`);

const github = 'https://raw.githubusercontent.com/vlooL411/chat/master/public/';
process.env.NODE_ENV = 'storybook';
process.env.HOST = 'http://localhost:6006';

process.env.EMPTY_AVATAR_USER = github + 'friend-empty.png';
process.env.EMPTY_AVATAR_CHAT = github + 'chat-empty.webp';
process.env.ICON_GOOGLE = github + 'iconGoogle.png';

module.exports = {
	stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/preset-scss',
	],
	webpackFinal: async config => {
		config.resolve.modules = [
			...(config.resolve.modules || []),
			`../`, //tsconfig.baseUrl: '.'
		];

		const alias = {
			'@types': join('apolloClient/types.ts'),
			'@backend': join('generated/graphql-backend.ts'),
			'@generated/frontend': join('generated/graphql-frontend.ts'),
		};

		config.resolve.alias = { ...config.resolve.alias, ...alias };

		return config;
	},
};
