import { ChatMain } from "@/components/chat/chat-main"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { useChatList } from "@/hooks/useChatLists"
import type { RoomInfo } from "@/types/Chat"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function ChatPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const character = location.state?.character

  useEffect(() => {
    if (!character) {
      navigate("/")
    }
    localStorage.setItem("character_id", character)
  }, [character, navigate])

  const [activeTab, setActiveTab] = useState("personal")
  const [activeChatId, setActiveChatId] = useState("") // Default active chat
  const { data: chatRoomList = [] } = useChatList(character)
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null) // Auto-select the first chat for desktop
  const chatRoom = chatRoomList.filter((room) => {
    return room.type.includes(activeTab)
  })
  console.log("chatRoom", chatRoom)
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024

      if (isDesktop && chatRoomList?.length > 0 && !activeChatId) {
        setActiveChatId(chatRoom[0]?.room_id)
        setRoomInfo(chatRoom[0])
      }
    }
    // run on mount
    handleResize()
    // listen for window resize
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [chatRoomList, activeChatId, chatRoom])

  return (
    <div className="flex h-screen">
      <ChatSidebar
        characterId={character ?? ""}
        chatRoom={chatRoom}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        setRoomInfo={setRoomInfo}
      />
      <ChatMain
        character_id={character ?? ""}
        activeChatId={activeChatId}
        roomInfo={roomInfo}
      />
    </div>
  )
}

export default ChatPage
