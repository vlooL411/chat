import CreateChat from '../../../components/CreateChat';
import Render, { RenderResult } from '../../testUtils';

describe('CreateChat Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = new Render(
			<CreateChat onOpen={() => true} onClose={() => {}} />,
		)
			.Apollo()
			.build();

		expect(component);
	});
});
