import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  commandButtonStyle,
} from "./ui/command";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Command = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const enter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", enter);
  }, []);

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
              Applications
            </span>
          </CommandItem>
          <CommandItem>
            <span
              className={commandButtonStyle}
              onClick={() => router.push("/settings")}
            >
              Settings
            </span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
