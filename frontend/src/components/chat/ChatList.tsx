import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatContactProps {
  room_id: string
  name: string
  other_character_name: string
  type: string
  avatarSrc: string
  lastMessage: string
  timestamp?: string
  hasUnread: boolean
  isActive: boolean
  onClick: (id: string) => void
}

export function ChatList({
  room_id,
  name,
  other_character_name,
  type,
  avatarSrc,
  lastMessage,
  timestamp,
  hasUnread,
  isActive,
  onClick,
}: ChatContactProps) {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted",
        isActive && "bg-muted"
      )}
      onClick={() => onClick(room_id)}
    >
      <Avatar>
        <AvatarImage src={avatarSrc} alt={name} />
        <AvatarFallback>
          {type.trim() === "private"
            ? other_character_name
            : (name?.charAt(0) ?? "?")}{" "}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-medium">
            {type.trim() === "private" ? other_character_name : name}
          </span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p className="truncate">{lastMessage}</p>
          {hasUnread && (
            <div className="ml-2 h-2 w-2 rounded-full bg-blue-500" />
          )}
        </div>
      </div>
    </div>
  )
}
