import Chats from '../../../components/Panels/Chats';
import Render, { RenderResult } from '../../testUtils';
import { ChatsMocks } from '../../../mocks/Components/Panels/Chats.mock';

describe('Chats Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = new Render(
			<Chats onSelectChat={() => null} />,
		)
			.Mock(ChatsMocks)
			.build();

		expect(component);
	});
});
