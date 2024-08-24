import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";

export default function useGetThread(token: string, id: string) {
  const getThread = useCallback(async () => {
    const response = await ky.get(
      `https://forum-api.dicoding.dev/v1/threads/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }, [id, token]);

  const {
    data: thread,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["threads", id],
    queryFn: getThread,
  });

  return { thread, isLoading, isError };
}
