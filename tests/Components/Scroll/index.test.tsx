import Scroll from '../../../components/Scroll';
import { render } from '../../testUtils';

describe('Scroll Component', () => {
	it('should render without crashing', () => {
		const component = render(
			<Scroll
				ref={null}
				className='RandomText'
				children={<>Random Children</>}
				scrollDown={100}
				scrollUp={100}
				onScrollDown={() => {}}
				onScrollUp={() => {}}
			/>,
		);
		expect(component);
	});
});
