import Signout from '../../../components/Sign/Signout';
import Render, { RenderResult } from '../../testUtils';

describe('Signout Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = new Render(<Signout />)
			.Apollo()
			.build();

		expect(component);
	});
});
