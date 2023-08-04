"use client"

import { createContext, use, useContext, useEffect, useState } from "react"

import { supabase } from "@/components/supabase"

const AppContext = createContext<any>({
    session: null,
    setSession: () => { },
})

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)

  return (
    <AppContext.Provider value={{session, setSession}}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
