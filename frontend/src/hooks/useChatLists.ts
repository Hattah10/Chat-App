import { useEffect, useState } from "react"
import { getChatlist } from "@/api/charactersApi"
import type { ChatListType } from "@/types/Chat"

export const useChatList = (characterId: string) => {
  const [chatList, setChatList] = useState<ChatListType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchChatList = async () => {
    try {
      setLoading(true)
      const data = await getChatlist(characterId)
      setChatList(data)
    } catch (err) {
      setError("Failed to load chat list")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!characterId) return
    fetchChatList()
  }, [characterId])

  return {
    chatList,
    loading,
    error,
    refetch: fetchChatList,
  }
}