"use client";

import { ProfileDropdown } from "./profile-dropdown";
import { useAppContext } from "@/app/session-context";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SiteHeader() {
  const { session } = useAppContext();

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent mb-5 header">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
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
              <Link href={"/auth"}>
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
