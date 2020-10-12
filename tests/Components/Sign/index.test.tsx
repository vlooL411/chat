import Sign from '../../../components/Sign'
import { Apollo } from '../../testUtils'

describe('Sign Component', () => {
    it('should render without crashing', () => {
        const component = Apollo(<Sign />)

        expect(component);
    });
});