import ModalWindow from '../../../components/ModalWindow'
import { render } from '../../testUtils'

describe('ModalWindow Component', () => {
    it('should render without crashing', () => {
        const component = render(
            <ModalWindow className='RandomText' style={{}}
                onOpen={() => true} onClose={() => { }} children={<></>} />);

        expect(component);
    });
});