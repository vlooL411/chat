import BlockContact from '../../../../components/Panels/Contacts/BlockContact';
import { render, RenderResult } from '../../../testUtils';

describe('Block Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = render(
			<BlockContact contact={null} onSelectContact={() => null} />,
		);

		expect(component);
	});
});
