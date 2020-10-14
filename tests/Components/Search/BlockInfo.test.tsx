import BlockInfo from '../../../components/Search/BlockInfo'
import { render, RenderResult } from '../../testUtils'

describe('BlockInfo Component', () => {
    it('should render without crashing', () => {
        const component: RenderResult = render(<BlockInfo what='RandomText' />)

        expect(component);
    });
});