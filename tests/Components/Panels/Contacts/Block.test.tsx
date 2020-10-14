import Block from '../../../../components/Panels/Contacts/Block'
import { render, RenderResult } from '../../../testUtils'

describe('Block Component', () => {
    it('should render without crashing', () => {
        const component: RenderResult =
            render(<Block contact={null} onSelectContact={() => { }} />);

        expect(component);
    });
});