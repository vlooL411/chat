import BlockInfo from '../../../components/Search/BlockInfo'
import { render } from '../../testUtils'

describe('BlockInfo Component', () => {
    it('should render without crashing', () => {
        const component = render(<BlockInfo what='RandomText' />)

        expect(component);
    });
});