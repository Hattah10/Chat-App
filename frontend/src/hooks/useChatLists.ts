import { useQuery } from "@tanstack/react-query";

import { getChatlist } from "@/api/charactersApi";
import type { ChatListType } from "@/types/Chat";

export const useChatList = (characterId: string) => {
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<ChatListType[], Error>({
    queryKey: ["chatRoomList", characterId],
    queryFn: () => getChatlist(characterId),
    enabled: !!characterId,
  });

  return {
    data,
    loading,
    error: error?.message ?? null,
    refetch,
  };
};