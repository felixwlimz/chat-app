import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";

export default function useGetAllThreads(token: string) {
  const getThread = useCallback(async (id : string) => {
    const response = await ky.get(`https://forum-api.dicoding.dev/v1/threads/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  }, [token]);

  const {
    data: threads,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["thread"],
    queryFn: () => getThread,
  });

  return { threads, isLoading, isError };
}
