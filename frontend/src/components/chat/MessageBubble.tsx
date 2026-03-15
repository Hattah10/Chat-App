import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface MessageBubbleProps {
  message: string
  isUserMessage: boolean
  avatarSrc?: string
}

const MessageBubble = ({
  message,
  isUserMessage,
  avatarSrc,
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUserMessage ? "justify-end" : ""
      )}
    >
      {!isUserMessage && (
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={avatarSrc || "/placeholder.svg"}
            alt="User Avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3",
          isUserMessage
            ? "rounded-br-none bg-primary text-primary-foreground"
            : "rounded-bl-none"
        )}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}


export default MessageBubble
