import Block from '../../../../components/Panels/Contacts/Block'
import { render } from '../../../testUtils'

describe('Block Component', () => {
    it('should render without crashing', () => {
        const component = render(<Block contact={null} onSelectContact={() => { }} />);

        expect(component);
    });
});