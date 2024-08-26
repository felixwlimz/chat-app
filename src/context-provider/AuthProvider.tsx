"use client";
import "reflect-metadata";
import useGetProfile from "@/hooks/users/use-get-profile";
import User from "@/models/user";
import { createContext, useContext, useEffect } from "react";
import { plainToInstance } from "class-transformer";
import { useRouter } from "next/navigation";

type AuthContextType = {
    singleUser : User,
    token : string 
}

const AuthContext = createContext<AuthContextType | null>(null)


export const AuthProvider = ({children} : { children : JSX.Element}) => {
    
    const token = sessionStorage.getItem('token')!
    const { user } = useGetProfile(token!)
    const singleUser = plainToInstance(User, user)
    const router = useRouter()

    useEffect(() => {
      if(!user || !token){
        router.push('/login')
      }
    }, [router, token, user])

    return (
        <AuthContext.Provider value={{ singleUser, token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)