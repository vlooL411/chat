import BlockSidebar from 'components/Sidebar/BlockSidebar'
import { faTable } from '@fortawesome/free-solid-svg-icons'

export default { title: 'Sidebar/BlockSidebar' }

export const toStorybook = () => <BlockSidebar className='RandomText' sideblock={{ fa: faTable, text: 'Table' }} />