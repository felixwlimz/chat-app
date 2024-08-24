import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";

export type Thread = {
    title : string 
    body : string 
    category : string 
}

export default function useCreateThread(token: string) {

  const newTheread = useCallback(async (thread : Thread) => {
    const create = await ky.post("https://forum-api.dicoding.dev/v1/threads", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json : thread
    });
    return await create.json();
  }, [token]);

  const { mutate : createThread } = useMutation({
     mutationFn : newTheread
  })

  return { createThread }
}
