import ContactExploler from '../../../components/Explolers/ContactExploler'
import Render, { RenderResult } from '../../testUtils'
import { ContactExplolerMocks } from '../../../mocks/Components/Explolers/ContactExploler.mock'

describe('ContactExploler Component', () => {
    it('should render without crashing', () => {
        const component: RenderResult = new Render(
            <ContactExploler contact={null} />)
            .Mock(ContactExplolerMocks)
            .build()

        expect(component);
    });
});