import ModalWindowMove from '../../../components/ModalWindow/ModalWindowMove'
import { render } from '../../testUtils'

describe('ModalWindowMove Component', () => {
    it('should render without crashing', () => {
        const component = render(
            <ModalWindowMove className='RandomText' style={{}}
                visible={true} children={<></>} />);

        expect(component);
    });
});