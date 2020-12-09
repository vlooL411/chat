const path = require('path');
const join = relativePath => path.join(__dirname, `../../${relativePath}`);

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
		{
			name: '@storybook/preset-scss',
			options: {
				cssLoaderOptions: {
					modules: true,
					localIdentName: '[name]__[local]--[hash:base64:5]',
				},
			},
		},
	],
	webpackFinal: async config => {
		config.resolve.modules = [
			...(config.resolve.modules || []),
			`../`, //tsconfig.baseUrl: '.'
		];

		const alias = { '@frontend/types': join('generated/src/types.ts') };

		config.resolve.alias = { ...config.resolve.alias, ...alias };

		return config;
	},
};
