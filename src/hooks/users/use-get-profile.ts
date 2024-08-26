import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";

export default function useGetProfile(token: string) {
  const getUser = useCallback(async () => {
    const response = await ky.get(
      "https://forum-api.dicoding.dev/v1/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  }, [token]);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getUser,
  });

  return { user, isLoading, isError };
}
