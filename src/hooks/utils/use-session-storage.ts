import { useCallback, useMemo } from "react";

export default function useSessionStorage<T>(key : string, value : T){
    
    
    const getItem = useMemo(() => {
        return sessionStorage.getItem(key)
    },[key])

    const setItem = useCallback(() => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }, [key, value])


    const removeItem = useCallback(() => {
        sessionStorage.removeItem(key)
    }, [key])

    return { getItem, setItem, removeItem }

}