"use client";
import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export type AuthContextType = {
    token : string 
}

export const AuthContext = createContext<AuthContextType | null>(null)


export const AuthProvider = ({children} : { children : JSX.Element}) => {
    
    const token = sessionStorage.getItem('token')
    const router = useRouter()
    useEffect(() => {
      if(token === '' || token === null){
        router.push('/login')
      }
    }, [router, token])

    return (
        <AuthContext.Provider value={{ token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
   const authContext = useContext(AuthContext);

   if(!authContext){
        throw new Error("useAuth must be used within an AuthProvider");
   }

   return authContext
}