import BlockSidebar from '../../../components/Sidebar/BlockSidebar';
import { render, RenderResult } from '../../testUtils';

describe('BlockSidebar Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = render(
			<BlockSidebar
				className='RandomText'
				sideblock={{
					fa: null,
					text: 'RandomText',
					href: '',
					onClick: () => {},
				}}
			/>,
		);

		expect(component);
	});
});
