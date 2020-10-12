import ChangeThemes from '../../components/ChangeThemes'
import { render } from '../testUtils'

describe('ChangeThemes Component', () => {
    it('should render without crashing', () => {
        const component = render(<ChangeThemes className='RandomText' />);

        expect(component);
    });
});