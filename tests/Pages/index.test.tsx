import Index from '../../pages'
import Render from '../testUtils'

describe('Pages Index Component', () => {
    it('should render without crashing', () => {
        const component = new Render(<Index />).Apollo().build();

        expect(component);
    });
});