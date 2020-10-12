import Signout from '../../../components/Sign/Signout'
import { Apollo } from '../../testUtils'

describe('Signout Component', () => {
    it('should render without crashing', () => {
        const component = Apollo(<Signout />)

        expect(component);
    });
});