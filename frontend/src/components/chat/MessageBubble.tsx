import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface MessageBubbleProps {
  message: string
  isUserMessage: boolean
  avatarSrc?: string | null
  name?: string | null
}

const MessageBubble = ({
  message,
  isUserMessage,
  avatarSrc,
  name,
}: MessageBubbleProps) => {
  const isImageAvatar = Boolean(avatarSrc?.startsWith("http"))

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUserMessage ? "justify-end" : "items-center"
      )}
    >
      {!isUserMessage && (
        <Avatar className="h-8 w-8">
          {isImageAvatar && (
            <AvatarImage
              src={avatarSrc ?? undefined}
              alt={name || "User Avatar"}
            />
          )}
          <AvatarFallback>
            {isImageAvatar
              ? name?.charAt(0) || "U"
              : avatarSrc || name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="max-w-[70%]">
        {!isUserMessage && name && (
          <p className="mb-1 text-xs font-medium">{name}</p>
        )}
        <div
          className={cn(
            "rounded-lg p-3",
            isUserMessage
              ? "rounded-br-none bg-primary text-primary-foreground"
              : "rounded-bl-none bg-accent"
          )}
        >
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
