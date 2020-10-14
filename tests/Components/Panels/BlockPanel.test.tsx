import { render, RenderResult } from '@testing-library/react'

import BlockPanel from '../../../components/Panels/BlockPanel'

describe('BlockPanel Component', () => {
    it('should render without crashing', () => {
        const component: RenderResult =
            render(<BlockPanel date='Date' image='src'
                text='RandomTex' title='Title'
                onClick={() => { }} />);

        expect(component);
    });
});