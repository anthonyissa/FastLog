import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchIcon } from "lucide-react"

export function SiteHeader({ openCommand } : { openCommand: Function}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button onClick={() => openCommand()} variant={"outline"}><SearchIcon className="mr-5 w-4 h-4"></SearchIcon> <span>Ctrl K</span></Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
