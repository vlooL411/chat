import Search from '../../../components/Search';

import { render, RenderResult } from '../../testUtils';

describe('Search Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = render(
			<Search
				loading={true}
				onBlur={() => null}
				onChange={() => null}
				onClear={() => null}
				onClick={() => null}
			/>,
		);

		expect(component);
	});
});
