import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { useCallback } from "react";

export default function useLeaderboard(token : string){
    
    const getLeaderboard = useCallback(async () => {
        const leaderboard = await ky.get("https://forum-api.dicoding.dev/v1/leaderboards", {
            headers : {
               'Authorization' : `Bearer ${token}`
            }
        });

        return await leaderboard.json()
    },[token]) 

    const { data : leaderboardsData, isLoading : leaderboardsLoading, isError : leaderboardsError } = useQuery({
        queryKey : ['leaderboards'],
        queryFn : getLeaderboard
    })

    return { leaderboardsData, leaderboardsLoading, leaderboardsError }

}