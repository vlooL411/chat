import BarBlock from '../../../../components/Explolers/Bar/BarBlock'
import { render, RenderResult } from '../../../testUtils'

describe("BarBlock Component", () => {
    it("should render without crashing", () => {
        const component: RenderResult = render(
            <BarBlock image='src' title='title' children={<></>} />)
        expect(component);
    });
});
