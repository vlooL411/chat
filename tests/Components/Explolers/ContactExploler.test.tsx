import { ObservableQuery } from '@apollo/client'

import ContactExploler from '../../../components/Explolers/ContactExploler'
import Render, { RenderResult } from '../../testUtils'
import { ContactExplolerMocks } from '../../../mocks/Components/Explolers/ContactExploler.mock'

ObservableQuery.prototype.refetch = jest.fn()
describe('ContactExploler Component', () => {
    it('should render without crashing', () => {
        const component: RenderResult = new Render(
            <ContactExploler contact={null} />)
            .Mock(ContactExplolerMocks)
            .build()

        expect(component);
    });
});