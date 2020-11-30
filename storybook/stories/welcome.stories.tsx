import React, { ReactElement } from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

export default { title: 'Welcome' };

export const toStorybook = (): ReactElement => (
	<Welcome showApp={linkTo('Button')} />
);
