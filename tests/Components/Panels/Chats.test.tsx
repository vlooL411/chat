import Chats from '../../../components/Panels/Chats'
import { ChatsMocks } from '../../mocks/Components/Panels/Chats.mock'
import { MocksRender } from '../../testUtils'

describe('Chats Component', () => {
    it('should render without crashing', () => {
        const component = MocksRender(ChatsMocks, <Chats onSelectChat={() => { }} />)

        expect(component);
    });
});