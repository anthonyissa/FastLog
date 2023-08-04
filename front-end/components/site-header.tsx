"use client"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchIcon } from "lucide-react"
import { Command } from "./command"
import { use, useEffect, useState } from "react"
import { useAppContext } from "@/app/session-context"
import { signOut, supabase } from "./supabase"
import { useRouter } from "next/navigation"

export function SiteHeader() {

  const { session, setSession } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      setSession((await supabase.auth.getSession()).data.session)
    }
    getSession()
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button variant={"outline"}><SearchIcon className="mr-5 w-4 h-4"></SearchIcon> <span>Ctrl K</span></Button>
            <ThemeToggle />
            <Command />
            {session ? <Button variant="default" onClick={() => signOut()}>Sign Out</Button> : <Button variant="default" onClick={() => router.push("/auth")}>Sign In</Button>}
          </nav>
        </div>
      </div>
    </header>
  )
}
