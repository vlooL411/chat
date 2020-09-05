import { ReactElement, useState, useMemo } from "react";
import Chats from "../components/Chats/Chats"
import FriendsList from "../components/FriendsList/FriendsList"
import Sidebar from "../components/Sidebar/sidebar";
import { faComment, faUsers, faSlidersH } from "@fortawesome/free-solid-svg-icons"
import ChatExploler from "../components/ChatExploler/ChatExploler";
import { ID } from "../apolloclient/types";

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

  const chatExploler =
    useMemo<ReactElement>(() => <ChatExploler id={chatIDCurrent} />,
      [chatIDCurrent])

  const sidebar = useMemo<ReactElement>(() =>
    <Sidebar faBlocks={
      [{ fa: faComment, text: 'Chats', onClick: () => setPaneCurrent(Panes.Chats) },
      { fa: faUsers, text: 'Friends', onClick: () => setPaneCurrent(Panes.FriendsList) },
      { fa: faSlidersH, text: 'Settings' }]} />,
    [])

  return <div style={{ display: 'flex', height: 'inherit' }}>
    {sidebar}
    {switchPane}
    {chatExploler}
  </div>
}

export default Index