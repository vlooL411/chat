import Password from 'components/Sign/Password';
import { createRef, ReactElement } from 'react';

export default { title: 'Components/Sign/Password' };

export const Default = (): ReactElement => <Password ref={createRef()} />;
