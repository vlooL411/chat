import ModalWindowMove from '../../../components/ModalWindow/ModalWindowMove';
import { render, RenderResult } from '../../testUtils';

describe('ModalWindowMove Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = render(
			<ModalWindowMove
				className='RandomText'
				style={{}}
				visible={true}
				children={<></>}
			/>,
		);

		expect(component);
	});
});
