import Loader from '../../components/Loader'
import { render } from '../testUtils'

describe('Loader Component', () => {
    it('should render without crashing', () => {
        const component = render(<Loader className='RandomText' loading={true} style={{}} />);

        expect(component);
    });
});