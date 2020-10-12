import BlockSidebar from '../../../components/Sidebar/BlockSidebar'
import { render } from '../../testUtils'

describe('BlockSidebar Component', () => {
    it('should render without crashing', () => {
        const component = render(
            <BlockSidebar className='RandomText'
                sideblock={{ fa: null, text: 'RandomText', href: '', onClick: () => { } }} />)

        expect(component);
    });
});