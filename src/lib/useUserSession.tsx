"use client"

import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "../lib/firebase/auth";
import { useState, useEffect } from "react";



export function useUserSession(initialUser: any) {
    // The initialUser comes from the server via a server component
    const [user, setUser] = useState(initialUser);
    const [loading, setIsLoading] = useState(true)
    const router = useRouter();
  
    useEffect(() => {
      const stateAuth = async () => {
        const unsubscribe = await onAuthStateChanged((authUser: any) => {
          setUser(authUser);
          setIsLoading(false)
        });
        return () => unsubscribe();
      };
      stateAuth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    useEffect(() => {
      onAuthStateChanged((authUser: any) => {
        if (user === undefined) return;
        // refresh when user changed to ease testing
        if (user?.email !== authUser?.email) {
          router.refresh();
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
  
    return {user, loading};
  }
  