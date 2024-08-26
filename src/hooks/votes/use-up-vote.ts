import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";

export default function useUpVote(token : string){

    const upVotePost = useCallback(async (id : string) => {
        const upVote = await ky.post(
          `https://forum-api.dicoding.dev/v1/threads/${id}/up-vote`, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
          }
        );

        return await upVote.json()
    },[token])


    const { mutate : upVote } = useMutation({
        mutationFn : upVotePost
    })


    return { upVote }

}