import MessageBlock from '../../../../components/Explolers/Message/MessageBlock'
import Create from '../../../../mocks/Create'
import Render, { RenderResult } from '../../../testUtils'

describe("MessageBlock Component", () => {
    it("should render without crashing", () => {
        const component: RenderResult = new Render(
            <MessageBlock chatid='random Text'
                message={Create.message()}
                countCharForExpanded={100}
                switchMessageAction={() => { }} />)
            .Apollo()
            .build();

        expect(component);
    });
});
