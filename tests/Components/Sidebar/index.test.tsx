import Sidebar from '../../../components/Sidebar'
import { Apollo } from '../../testUtils'

describe('Sidebar Component', () => {
    it('should render without crashing', () => {
        const component = Apollo(
            <Sidebar faBlocks={[{ fa: null, text: 'RandomText', href: '', onClick: () => { } }]}
                extendBlocks={[{ fa: null, text: 'RandomText', href: '', onClick: () => { } }]} />)

        expect(component);
    });
});