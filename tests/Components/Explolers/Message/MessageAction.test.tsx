import MessageAction from '../../../../components/Explolers/Message/MessageAction'
import Create from '../../../mocks/Create'
import { ApolloRender } from '../../../testUtils'

describe("MessageAction Component", () => {
    it("should render without crashing", () => {
        const component = ApolloRender(
            <MessageAction chatid='random Text' action={{ mode: "send", mes: Create.message() }} />)
        expect(component);
    });
});
