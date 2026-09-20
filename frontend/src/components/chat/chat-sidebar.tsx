"use client"

import { Button } from "@/components/ui/button"
import { Search, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChatListType, RoomInfo } from "@/types/Chat"
import { ChatList } from "./ChatList"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { useState } from "react"

import MultiSelect from "../ui/multi-select"
import { useCharacters } from "@/hooks/useCharacter"
import { useCreateRoom } from "@/hooks/useCreateRoom"

type Props = {
  characterId: string
  chatRoom: ChatListType[]
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  activeChatId: string
  setActiveChatId: React.Dispatch<React.SetStateAction<string>>
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomInfo | null>>
}

export function ChatSidebar({
  characterId,
  chatRoom,
  activeTab,
  setActiveTab,
  activeChatId,
  setActiveChatId,
  setRoomInfo,
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

  const { characters } = useCharacters()
  const { createRoom, loading, error } = useCreateRoom(characterId)

  const [open, setOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<(string | number)[]>([])

  const resetForm = () => {
    setSelectedUsers([])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!characterId || selectedUsers.length === 0) return

    try {
      const room = await createRoom({
        character_id: characterId,
        participant_ids: selectedUsers.map(String),
      })

      setActiveChatId(room.room_id)
      resetForm()
      setOpen(false)
    } catch {
      // Error text is shown from useCreateRoom
    }
  }

  const currentCharacterName = characters.find(
    (user) => user.id === characterId
  )?.name

  const displayGroupName = (name: string) => {
    if (!name || !currentCharacterName) return name
    return name
      .split(",")
      .map((part) => part.trim())
      .filter((part) => part !== currentCharacterName)
      .join(", ")
  }

  const userOptions = characters
    .filter((user) => user.id !== characterId)
    .map((user) => ({
      value: user.id,
      label: user.name,
    }))

  const handleChatSelect = (room: ChatListType) => {
    setActiveChatId(room.room_id)
    setRoomInfo(room)
  }

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
            activeTab === "group"
              ? "shadow-sm"
              : "text-muted-foreground hover:bg-transparent"
          )}
          onClick={() => setActiveTab("group")}
        >
          <Users className="mr-2 h-4 w-4" />
          Groups
        </Button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-2">
        {chatRoom?.map((contact) => (
          <ChatList
            key={contact.room_id}
            // {...contact}
            name={displayGroupName(contact.name)}
            other_character_name={contact.other_character_name}
            type={contact.type}
            avatarSrc="🙂"
            // lastMessage="No messages yet"
            hasUnread={false}
            isActive={contact.room_id === activeChatId}
            onClick={() => handleChatSelect(contact)}
          />
        ))}

        {chatRoom.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No conversations yet. Start a new chat!
          </p>
        )}
      </div>

      <div className="mt-6">
        <Dialog
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen)
            if (!nextOpen) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="w-full">New chat</Button>
          </DialogTrigger>

          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Create A New Chat</DialogTitle>
              </DialogHeader>
              <div className="w-full max-w-md space-y-3 py-3.5">
                <MultiSelect
                  key={open ? "new-chat-open" : "new-chat-closed"}
                  options={userOptions}
                  setSelect={setSelectedUsers}
                  placeholder={"Select User"}
                />

                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={loading || selectedUsers.length === 0}
                >
                  {loading ? "Creating..." : "Create Chat"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
