import Signup from '../../../components/Sign/Signup'
import { Apollo } from '../../testUtils'

describe('Signup Component', () => {
    it('should render without crashing', () => {
        const component = Apollo(<Signup onSignIn={() => { }} onSignUp={() => { }} />)

        expect(component);
    });
});