import { api } from "@/config/axios"
import type { CreateRoomPayload, CreateRoomResponse } from "@/types/Chat"

export const createRoom = async (
  payload: CreateRoomPayload
): Promise<CreateRoomResponse> => {
  const { data } = await api.post<CreateRoomResponse>("/rooms/", payload)
  return data
}
