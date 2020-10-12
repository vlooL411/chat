import { ObservableQuery } from '@apollo/client'

import Exploler from '../../../components/Explolers/Exploler'
import { ExplolerMocks } from '../../mocks/Components/Explolers/Exploler.mock'
import { MocksRender } from '../../testUtils'

ObservableQuery.prototype.refetch = jest.fn()
describe('Exploler Component', () => {
    it('should render without crashing', () => {
        const component = MocksRender(ExplolerMocks,
            <Exploler chatid='randomText'
                BarProps={() => ({
                    image: 'src',
                    title: 'title',
                    children: <></>,
                    dropList: () => [{ text: 'text', onClick: () => { } }]
                })} />)

        expect(component);
    });
});