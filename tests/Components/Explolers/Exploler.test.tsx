import { ObservableQuery } from '@apollo/client'

import Exploler from '../../../components/Explolers/Exploler'
import Render, { RenderResult } from '../../testUtils'
import { ExplolerMocks } from '../../../mocks/Components/Explolers/Exploler.mock'

ObservableQuery.prototype.refetch = jest.fn()
describe('Exploler Component', () => {
    it('should render without crashing', () => {
        const component: RenderResult = new Render(
            <Exploler chatid='randomText'
                BarProps={() => ({
                    image: 'src',
                    title: 'title',
                    children: <></>,
                    dropList: () => [{ text: 'text', onClick: () => { } }]
                })} />)
            .Mock(ExplolerMocks)
            .build()

        expect(component);
    });
});