/* eslint-disable react/display-name */
import { useAuth } from "@/context-provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function protectedRoute(WrappedComponent){
    return (props) => {
        const { token } = useAuth()
        const router = useRouter()

        useEffect(() => {
            if(!token){
               router.push('/login')
            }
        }, [router, token])

        return token ? <WrappedComponent {...props} /> : null
    }
}
