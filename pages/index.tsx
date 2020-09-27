import CreateChatModal from 'components/CreateChat'
import ChatExploler from 'components/Explolers/ChatExploler'
import ContactExploler from 'components/Explolers/ContactExploler'
import Chats from 'components/Panels/Chats'
import Contacts from 'components/Panels/Contacts'
import Sidebar from 'components/Sidebar'
import LocalStorage from 'utils/LocalSrorage'
import { Contact, ID } from '@types'
import { ReactElement, useMemo, useState } from 'react'
import { faComment, faQuoteRight, faSlidersH, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons'
import { gql, useQuery } from '@apollo/client'

const updateOnline = gql`
  query {
    UpdateOnlineUser
  }
`

enum Panels {
  Chats,
  Contacts,
  Channels
}

const lastPanel = +LocalStorage.getString('Panel', '', Panels.Chats.toString())

const Index = (): ReactElement => {
  useQuery(updateOnline, { pollInterval: 1000 * 60, fetchPolicy: 'network-only' })

  const [panelCurrent, setPanelCurrent] = useState<Panels>(lastPanel)
  const [chatIDCurrent, setIDCurrent] = useState<ID | Contact>(null!)
  const [createChat, setCreateChat] = useState<boolean>(false)

  const switchPanel = useMemo<ReactElement>(() => {
    LocalStorage.setString('Panel', '', panelCurrent.toString())
    switch (panelCurrent) {
      case Panels.Chats: return <Chats onSelectChat={setIDCurrent} />
      case Panels.Contacts: return <Contacts onSelectContact={setIDCurrent} />
      default: return null
    }
  }, [panelCurrent])

  const switchExploler = useMemo<ReactElement>(() => {
    switch (panelCurrent) {
      case Panels.Chats: return <ChatExploler chatid={chatIDCurrent as ID} />
      case Panels.Contacts: return <ContactExploler contact={chatIDCurrent as Contact} />
      default: return null
    }
  }, [chatIDCurrent])

  const sidebar = useMemo<ReactElement>(() =>
    <Sidebar faBlocks={
      [{ fa: faComment, text: 'Chats', onClick: () => setPanelCurrent(Panels.Chats) },
      { fa: faUsers, text: 'Contacts', onClick: () => setPanelCurrent(Panels.Contacts) },
      { fa: faQuoteRight, text: 'Channels', onClick: () => setPanelCurrent(Panels.Channels) }]}
      extendBlocks={
        [{ fa: faUserFriends, text: 'Create chat', onClick: () => setCreateChat(!createChat) },
        { fa: faUsers, text: 'Contacts', onClick: () => { } },
        { fa: faSlidersH, text: 'Settings' }]} />,
    [])

  return <div style={{ display: 'flex', height: 'inherit' }}>
    {sidebar}
    {switchPanel}
    {switchExploler}
    {createChat ? <CreateChatModal
      onOpen={() => createChat}
      onClose={() => setCreateChat(false)} /> : null}
  </div>
}

export default Index