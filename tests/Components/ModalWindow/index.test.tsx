import ModalWindow from '../../../components/ModalWindow';
import { render, RenderResult } from '../../testUtils';

describe('ModalWindow Component', () => {
	it('should render without crashing', () => {
		const component: RenderResult = render(
			<ModalWindow
				className='RandomText'
				style={{}}
				onOpen={() => true}
				onClose={() => {}}
				children={<></>}
			/>,
		);

		expect(component);
	});
});
