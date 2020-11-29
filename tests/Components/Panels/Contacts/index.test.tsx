import Contacts from '../../../../components/Panels/Contacts';
import Render, { RenderResult } from '../../../testUtils';
import { ContactsMocks } from '../../../../mocks/Components/Panels/Contacts.mock';

describe('Contacts Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = new Render(
			<Contacts onCreateContact={() => {}} onSelectContact={() => {}} />,
		)
			.Mock(ContactsMocks)
			.build();

		expect(component);
	});
});
