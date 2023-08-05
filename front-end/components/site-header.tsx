"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAppContext } from "@/app/session-context"

import { Command } from "./command"
import { ProfileDropdown } from "./profile-dropdown"
import { signOut, supabase } from "./supabase"

export function SiteHeader() {
  const { session } = useAppContext()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav  />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* <Button variant={"outline"}>
              <SearchIcon className="mr-5 w-4 h-4"></SearchIcon>{" "}
              <span>Ctrl K</span>
            </Button>
            <Command /> */}
            <ThemeToggle />
            {session ? (
              <ProfileDropdown />
            ) : (
              <Button variant="outline" onClick={() => router.push("/auth")}>
                Login
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
