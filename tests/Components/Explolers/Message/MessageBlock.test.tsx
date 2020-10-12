import MessageBlock from '../../../../components/Explolers/Message/MessageBlock'
import Create from '../../../mocks/Create'
import { ApolloRender } from '../../../testUtils'

describe("MessageBlock Component", () => {
    it("should render without crashing", () => {
        const component = ApolloRender(
            <MessageBlock chatid='random Text'
                message={Create.message()}
                countCharForExpanded={100}
                switchMessageAction={() => { }} />);

        expect(component);
    });
});
