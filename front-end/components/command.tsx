import { useEffect, useState } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, commandButtonStyle } from "./ui/command"
import { useRouter } from "next/navigation"

export const Command = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && e.ctrlKey) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <span
                    className={commandButtonStyle}
                    onClick={() => router.push("/apps")}
                  >
                    Apps
                  </span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
    )
}

