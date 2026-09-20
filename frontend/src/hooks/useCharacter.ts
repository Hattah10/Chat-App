import { useQuery } from '@tanstack/react-query';
import { getCharacters } from "../api/charactersApi";
import type { Character } from "@/types/Index";

export const useCharacters = () => {
  const {
    data: characters = [],
    isLoading: loading,
    error,
     } = useQuery<Character[], Error>({
    queryKey: ["characters"],
    queryFn: getCharacters,
  });

  return {
    characters,
    loading,
    error: error?.message ?? null,
  };
};