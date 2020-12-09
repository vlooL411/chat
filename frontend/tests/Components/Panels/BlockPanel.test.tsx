import BlockPanel from '../../../components/Panels/BlockPanel';
import { render, RenderResult } from '../../testUtils';

describe('BlockPanel Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = render(
			<BlockPanel
				date='Date'
				image='src'
				text='RandomTex'
				title='Title'
				onClick={() => null}
			/>,
		);

		expect(component);
	});
});
