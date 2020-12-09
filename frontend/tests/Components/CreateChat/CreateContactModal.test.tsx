import CreateContactModal from 'components/CreateChat/CreateContactModal';
import Render, { RenderResult } from '../../testUtils';

describe('CreateContactModal Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = new Render(
			<CreateContactModal onOpen={() => true} onClose={() => null} />,
		)
			.Apollo()
			.build();

		expect(component);
	});
});
