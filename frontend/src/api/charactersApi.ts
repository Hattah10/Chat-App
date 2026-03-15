import { api } from "@/config/axios"
import type { ChatListType } from "@/types/Chat"
import type { Character } from "@/types/Index"


export const getCharacters = async (): Promise<Character[]> => {
  const { data } = await api.get<Character[]>("/characters/")
  return data
}

export const getChatlist = async (characterId: string): Promise<ChatListType[]> => {
  const { data } = await api.get<ChatListType[]>(`/characters/${characterId}`)
  return data
}