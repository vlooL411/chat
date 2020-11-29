import BarExploler from '../../../../components/Explolers/Bar/BarExploler';
import Render, { RenderResult } from '../../../testUtils';
import { BarExplolerMocks } from '../../../../mocks/Components/Explolers/Bar/BarExploler.mock';

describe('BarExploler Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = new Render(
			(
				<BarExploler
					image='src'
					title='title'
					children={<></>}
					dropList={() => [{ text: 'text', onClick: () => {} }]}
				/>
			),
		)
			.Mock(BarExplolerMocks)
			.build();

		expect(component);
	});
});
