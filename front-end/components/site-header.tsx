"use client";

import { Command } from "./command";
import { ProfileDropdown } from "./profile-dropdown";
import { useAppContext } from "@/app/session-context";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { LayoutDashboard, SearchIcon } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  const { session } = useAppContext();

  return (
    <header className="fixed top-0 z-40 w-full bg-transparent header">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* <Button variant={"outline"}>
              <SearchIcon className="mr-5 w-4 h-4"></SearchIcon>{" "}
              <span>Ctrl K</span>
            </Button> */}
            {/* <Command /> */}
            {session ? (
              <div className="flex items-center">
                {/* <Link href={"/apps"}>
                  <Button variant={"link"} className="text-primary">
                    Apps
                  </Button>
                </Link> */}
                <ProfileDropdown />
              </div>
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
