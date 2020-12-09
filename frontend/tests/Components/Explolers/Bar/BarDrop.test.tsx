import BarDrop from '../../../../components/Explolers/Bar/BarDrop';
import Render, { RenderResult } from '../../../testUtils';
import { BarDropMocks } from '../../../../mocks/Components/Explolers/Bar/BarDrop.mock';

describe('BarDrop Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = new Render(
			<BarDrop visible={false} dropList={() => [{ text: 'text' }]} />,
		)
			.Mock(BarDropMocks)
			.build();

		expect(component);
	});
});
