import Search from '../../../components/Search'
import { render } from '../../testUtils'

describe('Search Component', () => {
    it('should render without crashing', () => {
        const component = render(
            <Search loading={true}
                onBlur={() => { }} onChange={() => { }}
                onClear={() => { }} onClick={() => { }} />)

        expect(component);
    });
});