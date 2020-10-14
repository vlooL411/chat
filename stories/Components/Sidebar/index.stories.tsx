import Sidebar from 'components/Sidebar'
import React from 'react'
import { faComment, faQuoteRight, faSlidersH, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons'
import { SidebarBlock } from 'components/Sidebar/BlockSidebar'
import { MockedProvider } from '@apollo/client/testing'
import { SidebarMocks } from 'mocks/Components/Sidebar.mock'

export default { title: 'Sidebar' }

const faBlocks: SidebarBlock[] =
    [{ fa: faComment, text: 'Chats', href: '', onClick: () => { } },
    { fa: faUsers, text: 'Contacts', href: '', onClick: () => { } },
    { fa: faQuoteRight, text: 'Channels', href: '', onClick: () => { } }]
const extendBlocks: SidebarBlock[] =
    [{ fa: faUserFriends, text: 'Create chat', href: '', onClick: () => { } },
    { fa: faUsers, text: 'Contacts', href: '', onClick: () => { } },
    { fa: faSlidersH, text: 'Settings', href: '', onClick: () => { } }]

export const toStorybook = () =>
    <MockedProvider mocks={SidebarMocks}>
        <Sidebar faBlocks={faBlocks} extendBlocks={extendBlocks} />
    </MockedProvider>