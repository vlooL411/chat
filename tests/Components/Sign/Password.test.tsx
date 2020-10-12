import Password from '../../../components/Sign/Password'
import { Apollo } from '../../testUtils'

describe('Password Component', () => {
    it('should render without crashing', () => {
        const component = Apollo(<Password ref={null} />)

        expect(component);
    });
});