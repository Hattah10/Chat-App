"use client"

import { Button } from "@/components/ui/button"
import { Search, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChatListType } from "@/types/Chat"
import { ChatList } from "./ChatList"

type Props = {
  chatContact: ChatListType[]
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  activeChatId: string
  setActiveChatId: React.Dispatch<React.SetStateAction<string>>
}
export function ChatSidebar({
  chatContact,
  activeTab,
  setActiveTab,
  activeChatId,
  setActiveChatId,
}: Props) {
  // const chatContacts = [
  // {
  //   id: "1",
  //   name: "Shannon Baker",
  //   avatarSrc: "/placeholder.svg?height=40&width=40",
  //   lastMessage: "Will do. Appreciat...",
  //   timestamp: "07:39 AM",
  //   hasUnread: false
  // },
  // {
  //   id: "2",
  //   name: "Jessica Wells",
  //   avatarSrc: "/placeholder.svg?height=40&width=40",
  //   lastMessage: "Perfect. I'll pack...",
  //   timestamp: "05:39 PM",
  //   hasUnread: true
  // },
  // ];

  return (
    <div className="flex w-full flex-col border border-r p-4 lg:w-80">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chat</h1>
        <Search className="h-5 w-5 cursor-pointer text-muted-foreground" />
      </div>
      <div className="mb-6 flex rounded-lg border p-1">
        <Button
          variant="ghost"
          className={cn(
            "h-9 flex-1 rounded-md text-sm font-medium",
            activeTab === "personal"
              ? "shadow-sm"
              : "text-muted-foreground hover:bg-transparent"
          )}
          onClick={() => setActiveTab("personal")}
        >
          <User className="mr-2 h-4 w-4" />
          Personal
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "h-9 flex-1 rounded-md text-sm font-medium",
            activeTab === "groups"
              ? "shadow-sm"
              : "text-muted-foreground hover:bg-transparent"
          )}
          onClick={() => setActiveTab("groups")}
        >
          <Users className="mr-2 h-4 w-4" />
          Groups
        </Button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-2">
        {chatContact?.map((contact) => (
          <ChatList
            key={contact.room_id}
            // {...contact}
            room_id={contact.room_id}
            name={contact.name}
            other_character_name={contact.other_character_name}
            type={contact.type}
            avatarSrc="🙂"
            lastMessage="No messages yet"
            hasUnread={false}
            isActive={contact.room_id === activeChatId}
            onClick={setActiveChatId}
          />
        ))}
      </div>

      <div className="mt-6">
        <Button className="w-full">New chat</Button>
      </div>
    </div>
  )
}
