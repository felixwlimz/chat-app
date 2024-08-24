import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";

export default function useGetAllThreads(token : string){
  
    const getAllThreads = useCallback(async () => {
        const response = await ky.get(
          "https://forum-api.dicoding.dev/v1/threads",{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
          }
        );
        return await response.json();
    }, [token])

    const { data : threadsResponse, isLoading, isError } = useQuery({
        queryKey : ['threads'],
        queryFn : getAllThreads
    })

    return { threadsResponse , isLoading, isError }

}