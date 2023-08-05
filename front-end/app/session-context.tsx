"use client"

import { createContext, use, useContext, useEffect, useState } from "react"

import { supabase } from "@/components/supabase"

const AppContext = createContext<any>({
    session: null,
    setSession: () => { },
    userId: "",
    setUserId: () => { }
})

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)
  const [userId, setUserId] = useState<string>("")

  const updateSession = async () => {
    const s = await supabase.auth.getSession()
    setSession(s.data.session)
    setUserId(s.data.session?.user?.id || "")
  }
  
  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      updateSession();
    } 
  })

  useEffect(() => {
    updateSession()
  }, [])

  return (
    <AppContext.Provider value={{session, setSession, userId, setUserId}}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
