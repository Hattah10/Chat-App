// src/hooks/useUser.ts
import { useState, useEffect } from "react";
import { getCharacters } from '../api/charactersApi';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await getCharacters();
        setCharacters(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return { characters, loading, error };
};