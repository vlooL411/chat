import BarExploler from '../../../../components/Explolers/Bar/BarExploler'
import { BarExplolerMocks } from '../../../mocks/Components/Explolers/Bar/BarExploler.mock'
import { MocksRender } from '../../../testUtils'

describe("BarExploler Component", () => {
    it("should render without crashing", () => {
        const component = MocksRender(BarExplolerMocks,
            <BarExploler image='src' title='title' children={<></>}
                dropList={() => [{ text: 'text', onClick: () => { } }]} />)
        expect(component);
    });
});