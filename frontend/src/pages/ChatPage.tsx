import { ChatMain } from "@/components/chat/chat-main"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function ChatPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const character = location.state?.character

  useEffect(() => {
    if (!character) {
      // redirect to home if no character selected
      navigate("/")
    }
  }, [character, navigate])
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <ChatMain />
    </div>
  )
}

export default ChatPage
