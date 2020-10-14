import Loader from '../../components/Loader'
import { render, RenderResult } from '../testUtils'

describe('Loader Component', () => {
    it('should render without crashing', () => {
        const component: RenderResult =
            render(<Loader className='RandomText' loading={true} style={{}} />);

        expect(component);
    });
});