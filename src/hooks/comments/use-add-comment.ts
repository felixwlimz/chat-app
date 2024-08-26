import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";

export default function useAddComment(token: string, id: string) {
  const newComment = useCallback(async (comment: string) => {
    const response = await ky.post(
      `https://forum-api.dicoding.dev/v1/threads/${id}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: {
          content: comment,
        },
      }
    );
    return await response.json();
  }, [ id, token]);

  const { mutate: addComment } = useMutation({
    mutationFn: newComment,
  });

  return { addComment }
}