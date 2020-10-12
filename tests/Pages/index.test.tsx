import Index from '../../pages'
import { Apollo } from '../testUtils'

describe('Loader Component', () => {
    it('should render without crashing', () => {
        const component = Apollo(<Index />);

        expect(component);
    });
});