import { ObservableQuery } from '@apollo/client'

import ChatExploler from '../../../components/Explolers/ChatExploler'
import Render, { RenderResult } from '../../testUtils'
import { ChatExplolerMocks } from '../../../mocks/Components/Explolers/ChatExploler.mock'

ObservableQuery.prototype.refetch = jest.fn()
describe('ChatExploler Component', () => {
    it('should render without crashing', () => {
        const component: RenderResult = new Render(<ChatExploler chatid='randomID' />)
            .Mock(ChatExplolerMocks)
            .build()

        expect(component);
    });
});