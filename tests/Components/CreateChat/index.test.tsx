import CreateChat from '../../../components/CreateChat'
import { Apollo } from '../../testUtils'

describe('CreateChat Component', () => {
    it('should render without crashing', () => {
        const component = Apollo(<CreateChat onOpen={() => true} onClose={() => { }} />)

        expect(component);
    });
});