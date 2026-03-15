import { ChatMain } from "@/components/chat/chat-main"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { useChatList } from "@/hooks/useChatLists"
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
    console.log(character)
    localStorage.setItem("character_id", character)
  }, [character, navigate])

  const [activeTab, setActiveTab] = useState("personal")
  const [activeChatId, setActiveChatId] = useState("") // Default active chat
  const { chatList } = useChatList(character)

  // Auto-select the first chat for desktop
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024

      if (isDesktop && chatList?.length > 0) {
        setActiveChatId(chatList[0].room_id)
      } else {
        setActiveChatId("") // reset for mobile/tablet
      }
    }
    // run on mount
    handleResize()
    // listen for window resize
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [chatList])

  return (
    <div className="flex h-screen">
      <ChatSidebar
        chatContact={chatList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
      />
      <ChatMain character_id={character ?? ""} activeChatId={activeChatId} />
    </div>
  )
}

export default ChatPage
