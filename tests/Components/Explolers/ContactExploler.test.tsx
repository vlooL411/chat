import { ObservableQuery } from '@apollo/client'

import ContactExploler from '../../../components/Explolers/ContactExploler'
import { ContactExplolerMocks } from '../../mocks/Components/Explolers/ContactExploler.mock'
import { MocksRender } from '../../testUtils'

ObservableQuery.prototype.refetch = jest.fn()
describe('ContactExploler Component', () => {
    it('should render without crashing', () => {
        const component = MocksRender(ContactExplolerMocks,
            <ContactExploler contact={null} />)

        expect(component);
    });
});