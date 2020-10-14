import Sign from '../../../components/Sign'
import Render, { RenderResult } from '../../testUtils'

describe('Sign Component', () => {
    it('should render without crashing', () => {
        const component: RenderResult =
            new Render(<Sign />)
                .Apollo()
                .build()

        expect(component);
    });
});