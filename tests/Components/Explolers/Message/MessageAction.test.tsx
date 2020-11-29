import MessageAction from '../../../../components/Explolers/Message/MessageAction';
import Create from '../../../../mocks/Create';
import Render, { RenderResult } from '../../../testUtils';

describe('MessageAction Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = new Render(
			(
				<MessageAction
					chatid='random Text'
					action={{ mode: 'send', mes: Create.message() }}
				/>
			),
		)
			.Apollo()
			.build();

		expect(component);
	});
});
