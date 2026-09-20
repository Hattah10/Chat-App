import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRoom } from "@/api/roomsApi"
import type { CreateRoomPayload, CreateRoomResponse } from "@/types/Chat"

export const useCreateRoom = (characterId: string) => {
  const queryClient = useQueryClient()

  const {
    mutateAsync,
    isPending: loading,
    error,
  } = useMutation<CreateRoomResponse, Error, CreateRoomPayload>({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatRoomList", characterId] })
    },
  })

  return {
    createRoom: mutateAsync,
    loading,
    error: error?.message ?? null,
  }
}
