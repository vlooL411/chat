import Scroll from 'components/Scroll';
import { render } from '../../testUtils';

describe('Scroll Component', () => {
	it('should render without crashing', () => {
		const component = render(
			<Scroll
				ref={null}
				className='RandomText'
				scrollDown={100}
				scrollUp={100}
				onScrollDown={() => null}
				onScrollUp={() => null}>
				<>Random Children</>
			</Scroll>,
		);
		expect(component);
	});
});
