import { ObservableQuery } from '@apollo/client'

import ChatExploler from '../../../components/Explolers/ChatExploler'
import { ChatExplolerMocks } from '../../mocks/Components/Explolers/ChatExploler.mock'
import { MocksRender } from '../../testUtils'

ObservableQuery.prototype.refetch = jest.fn()
describe('ChatExploler Component', () => {
    it('should render without crashing', () => {
        const component = MocksRender(ChatExplolerMocks, <ChatExploler chatid='randomID' />)

        expect(component);
    });
});