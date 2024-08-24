import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";

export default function useGetUsers(token : string){

    const getAllUsers = useCallback(async () => {
       const response = await ky.get("https://forum-api.dicoding.dev/v1/users", {
          headers : {
            'Authorization' : `Bearer ${token}`
          }
       });
       return await response.json()
    }, [token])
    
    const { data : users, isLoading, isError } = useQuery({
        queryKey : ['users'],
        queryFn : getAllUsers,
    })

    return { users, isLoading, isError }
}