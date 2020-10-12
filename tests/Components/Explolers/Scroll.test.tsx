import Scroll from '../../../components/Explolers/Scroll'
import { render } from '../../testUtils'

describe("Scroll Component", () => {
    it("should render without crashing", () => {
        const component = render(
            <Scroll chat={null} infoMore={null}
                limit={100} scrollLoad={100} loadMess={true}
                refetch={() => { }} changeModeMessage={() => { }} />
        );
        expect(component);
    });
});
