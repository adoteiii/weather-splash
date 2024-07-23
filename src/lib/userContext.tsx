"use client"
import React, {  createContext } from "react";
import { useUserSession } from "./useUserSession";
export const AuthorizationContext = createContext<any>(null);


interface authContextProps {
    initialUser: any
    children: React.ReactNode
}

export function AuthContext(props: authContextProps) {
    const {user, loading} = useUserSession(props.initialUser)
    return <AuthorizationContext.Provider value={{user, loading}}>
        {props.children}
    </AuthorizationContext.Provider>
}