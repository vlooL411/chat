import Chats from "components/Chats"
import { ID } from "apolloclient/types";
import Sidebar from "components/Sidebar";
import FriendsList from "components/FriendsList"
import ChatExploler from "components/ChatExploler";
import CreateChatModal from "components/Chats/CreateChatModal";
import { ReactElement, useState, useMemo, useEffect } from "react";
import { faComment, faUsers, faSlidersH, faUserFriends } from "@fortawesome/free-solid-svg-icons"

enum Panes {
  Chats,
  FriendsList
}

const Index = (): ReactElement => {
  const [paneCurrent, setPaneCurrent] = useState<Panes>(Panes.Chats)
  const [chatIDCurrent, setChatIDCurrent] = useState<ID>(null!)

  const switchPane = useMemo<ReactElement>(() => {
    switch (paneCurrent) {
      case Panes.Chats: return <Chats onSelectChat={(id: ID) => setChatIDCurrent(id)} />
      case Panes.FriendsList: return <FriendsList />
    }
  }, [paneCurrent])

  const [createChat, setCreateChat] = useState<boolean>(false)

  const sidebar = useMemo<ReactElement>(() =>
    <Sidebar faBlocks={
      [{ fa: faComment, text: 'Chats', onClick: () => setPaneCurrent(Panes.Chats) },
      { fa: faUsers, text: 'Friends', onClick: () => setPaneCurrent(Panes.FriendsList) }]}
      extendBlocks={
        [{ fa: faUserFriends, text: 'Create chat', onClick: () => setCreateChat(!createChat) },
        { fa: faUsers, text: 'Friends', onClick: () => { } },
        { fa: faSlidersH, text: 'Settings' }]} />,
    [])

  return <div style={{ display: 'flex', height: 'inherit' }}>
    {sidebar}
    {switchPane}
    <ChatExploler chatid={chatIDCurrent} />
    {createChat ? <CreateChatModal
      onOpen={() => createChat}
      onClose={() => setCreateChat(false)} /> : null}
  </div>
}

export default Index