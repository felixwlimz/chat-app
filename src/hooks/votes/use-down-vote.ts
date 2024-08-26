import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";

export default function useDownVote(token: string) {
  const downVotePost = useCallback(
    async (id: string) => {
      const downVote = await ky.post(
        `https://forum-api.dicoding.dev/v1/threads/${id}/down-vote`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return await downVote.json();
    },
    [token]
  );

  const { mutate: downVote } = useMutation({
    mutationFn: downVotePost,
  });

  return { downVote };
}
