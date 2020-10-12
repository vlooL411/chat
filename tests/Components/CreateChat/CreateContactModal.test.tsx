import CreateContactModal from '../../../components/CreateChat/CreateContactModal'
import { Apollo } from '../../testUtils'

describe('CreateContactModal Component', () => {
    it('should render without crashing', () => {
        const component = Apollo(<CreateContactModal onOpen={() => true} onClose={() => { }} />)

        expect(component);
    });
});