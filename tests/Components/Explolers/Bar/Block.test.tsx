import BarBlock from '../../../../components/Explolers/Bar/BarBlock'
import { render } from '../../../testUtils'

describe("BarBlock Component", () => {
    it("should render without crashing", () => {
        const component = render(
            <BarBlock image='src' title='title' children={<></>} />)
        expect(component);
    });
});
