"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAppContext } from "@/app/session-context"

import { ProfileDropdown } from "./profile-dropdown"

export function SiteHeader() {
  const { session } = useAppContext()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent">
      <div className="container flex h-16 max-w-6xl items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
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
