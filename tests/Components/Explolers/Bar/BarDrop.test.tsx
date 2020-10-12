import BarDrop from '../../../../components/Explolers/Bar/BarDrop'
import { BarDropMocks } from '../../../mocks/Components/Explolers/Bar/BarDrop.mock'
import { MocksRender } from '../../../testUtils'

describe("BarDrop Component", () => {
    it("should render without crashing", () => {
        const component = MocksRender(BarDropMocks,
            <BarDrop visible={true} dropList={() => [{ text: 'text', onClick: () => { } }]} />)
        expect(component);
    });
});
