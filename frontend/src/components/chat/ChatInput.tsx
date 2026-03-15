import React, { useState } from "react"
import type { SendMessagePayload } from "@/types/Chat"
import { ArrowRight, ImageIcon } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
// import { v4 as uuidv4 } from "uuid"
interface ChatInputProps {
  room_id: string
  character_id: string
  sendMessage: (data: SendMessagePayload) => void
}
export const ChatInput: React.FC<ChatInputProps> = ({
  room_id,
  character_id,
  sendMessage,
}) => {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!message.trim()) return
    sendMessage({ message, character_id, room_id })
    setMessage("")
  }

  return (
    // <div className="flex gap-2 border-t p-4">
    //   <input
    //     className="flex-1 rounded-lg border p-2 focus:ring focus:outline-none"
    //     type="text"
    //     value={message}
    //     onChange={(e) => setMessage(e.target.value)}
    //     placeholder="Type your message..."
    //     onKeyDown={(e) => e.key === "Enter" && handleSend()}
    //   />
    //   <button
    //     className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    //     onClick={handleSend}
    //   >
    //     Send
    //   </button>
    // </div>

    <div className="flex items-center gap-3 border border-t p-4">
      <ImageIcon className="h-5 w-5 cursor-pointer text-muted-foreground" />
      <Input
        className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button size="icon" className="rounded-full" onClick={handleSend}>
        <ArrowRight />
      </Button>
    </div>
  )
}
