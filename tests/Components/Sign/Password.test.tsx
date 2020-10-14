import Password from '../../../components/Sign/Password'
import { render, RenderResult } from '../../testUtils'

describe('Password Component', () => {
    it('should render without crashing', () => {
        const component: RenderResult =
            render(<Password ref={null} />)

        expect(component);
    });
});