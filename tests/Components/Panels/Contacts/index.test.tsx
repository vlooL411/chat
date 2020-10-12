import Contacts from '../../../../components/Panels/Contacts'
import { ContactsMocks } from '../../../mocks/Components/Panels/Contacts.mock'
import { MocksRender } from '../../../testUtils'

describe('Contacts Component', () => {
    it('should render without crashing', () => {
        const component = MocksRender(ContactsMocks, <Contacts onCreateContact={() => { }} onSelectContact={() => { }} />)

        expect(component);
    });
});