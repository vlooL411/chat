import ChangeThemes from '../../components/ChangeThemes';
import { render, RenderResult } from '../testUtils';

describe('ChangeThemes Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = render(
			<ChangeThemes className='RandomText' />,
		);

		expect(component);
	});
});
