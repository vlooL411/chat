import Signup from '../../../components/Sign/Signup';
import Render, { RenderResult } from '../../testUtils';

describe('Signup Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = new Render(
			<Signup onSignIn={() => {}} onSignUp={() => {}} />,
		)
			.Apollo()
			.build();

		expect(component);
	});
});
