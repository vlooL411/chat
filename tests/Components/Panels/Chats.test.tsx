import { RenderResult } from '@testing-library/react'

import Chats from '../../../components/Panels/Chats'
import Render from '../../testUtils'
import { ChatsMocks } from '../../../mocks/Components/Panels/Chats.mock'

describe('Chats Component', () => {
    it('should render without crashing', () => {
        const component: RenderResult = new Render(<Chats onSelectChat={() => { }} />)
            .Mock(ChatsMocks)
            .build()

        expect(component);
    });
});