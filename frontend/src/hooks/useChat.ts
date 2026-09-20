// src/hooks/useChat.ts
import { useEffect, useState } from "react"
import { socket } from "@/config/socket"
import type { MessageType, SendMessagePayload } from "@/types/Chat"

export const useChat = (room_id:string) => {
  const [messages, setMessages] = useState<MessageType[]>([])

  useEffect(() => {
      if (!room_id) return;

    // Clear messages for new room
  setMessages([])
    // Join the room when hook mounts / room_id changes
    if (!socket.connected) socket.connect()
    socket.emit("join_room", room_id)

    // Handler for incoming messages
    const handleMessage = (msg: MessageType) => {
      setMessages(prev => [...prev, msg])
    }

    const handleLoadMessages = (msg: MessageType[]) => {
      setMessages(msg)
    }
    socket.on("load_messages", handleLoadMessages)

    socket.on("receive_message", handleMessage)

    // Cleanup
    return () => {
      socket.emit("leave_room", room_id)
      socket.off("receive_message", handleMessage)
      // Do NOT disconnect here, other hooks might still use socket
    }
  }, [room_id])
  
const sendMessage = ({ message, character_id, room_id }: SendMessagePayload) => {

  const newMessage: MessageType = {
  id: crypto.randomUUID(),
    room_id: room_id,
    character_id: character_id,
    content: message,            // raw content
    created_at: new Date().toISOString()
  }
  // setMessages((prev) => [...prev, newMessage])
  socket.emit("send_message", newMessage)

}

  return { messages, sendMessage }
}