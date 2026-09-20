import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreVertical } from "lucide-react"

import { useEffect } from "react"
import { ChatInput } from "./ChatInput"
import MessageBubble from "./MessageBubble"
import { useChat } from "@/hooks/useChat"

type Props = {
  character_id: string
  activeChatId: string
}
export function ChatMain({ character_id, activeChatId }: Props) {
  const { messages, sendMessage } = useChat(activeChatId)
  const roomInfo = {
    name: "Shannon Baker",
    avatarSrc: "/placeholder.svg?height=40&width=40",
    status: "last seen recently",
  }

  useEffect(() => {})
  return (
    <div className="m-4 hidden rounded-lg shadow-sm lg:flex lg:flex-1 lg:flex-col">
      <div className="flex items-center justify-between border border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={roomInfo.avatarSrc || "/placeholder.svg"}
              alt={roomInfo.name}
            />
            <AvatarFallback>{roomInfo.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{roomInfo.name}</h2>
            {/* <p className="text-sm text-muted-foreground">{roomInfo.status}</p> */}
          </div>
        </div>
        <MoreVertical className="h-5 w-5 cursor-pointer text-muted-foreground" />
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.content}
            isUserMessage={(msg.character_id === character_id) === true}
            // avatarSrc={null}
          />
        ))}
      </div>

      <ChatInput
        room_id={activeChatId}
        character_id={character_id}
        sendMessage={sendMessage}
      />
      {/* <div className="flex items-center gap-3 border border-t p-4">
        <ImageIcon className="h-5 w-5 cursor-pointer text-muted-foreground" />
        <Input
          placeholder="Enter a prompt here"
          className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button size="icon" className="rounded-full">
          <ArrowRight />
        </Button>
      </div> */}
    </div>
  )
}
