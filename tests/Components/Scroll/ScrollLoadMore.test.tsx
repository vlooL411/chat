import ScrollLoadMore from '../../../components/Scroll/ScrollLoadMore'
import { render } from '../../testUtils'

describe("ScrollLoadMore Component", () => {
    it("should render without crashing", () => {
        const component = render(
            <ScrollLoadMore className='RandomText' array={null}
                isEnd={{ down: null, up: null }}
                cmpEnd={() => true}
                elemInit={() => <></>}
                onScrollZero={() => { }}
                scrollDown={100} scrollUp={100}
                onScrollDown={() => { }} onScrollUp={() => { }} />
        );
        expect(component);
    });
});
