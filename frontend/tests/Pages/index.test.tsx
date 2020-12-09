import Index from '../../pages';
import Render, { RenderResult } from '../testUtils';

describe('Pages Index Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = new Render(<Index />).Apollo().build();

		expect(component);
	});
});
