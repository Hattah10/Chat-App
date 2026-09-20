export interface MessageType {
  id: string
  character_id: string //this is the id of sender
  created_at: string
  content: string
  room_id: string
}

export interface SendMessagePayload {
  message: string
  character_id: string
  room_id: string
}
export interface CreateRoomPayload {
  character_id: string
  participant_ids: string[]
  name?: string | null
}

export interface CreateRoomResponse {
  room_id: string
  type: string
  name: string | null
}

export interface ChatListType {
  room_id: string
  name: string
  other_character_name:string
  type:string
  avatarSrc: string
  lastMessage: string
  timestamp: string
  hasUnread: boolean
  isActive: boolean
  onClick: (id: string) => void
}