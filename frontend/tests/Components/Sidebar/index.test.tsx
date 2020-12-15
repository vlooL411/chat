import Sidebar from '../../../components/Sidebar';
import { SidebarMocks } from '../../../mocks/Components/Sidebar.mock';

import Render, { RenderResult } from '../../testUtils';

describe('Sidebar Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = new Render(
			(
				<Sidebar
					faBlocks={[
						{
							fa: null,
							text: 'RandomText',
							href: '',
							onClick: () => null,
						},
					]}
					extendBlocks={[
						{
							fa: null,
							text: 'RandomText',
							href: '',
							onClick: () => null,
						},
					]}
				/>
			),
		)
			.Mock(SidebarMocks)
			.Apollo()
			.build();

		expect(component);
	});
});