import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Cross, Menu, X } from "lucide-react";
import Link from "next/link";

export default function ResponsiveMenu() {
  return (
    <Sheet>
      <SheetTrigger className="block sm:hidden ">
        <Menu />
      </SheetTrigger>
      <SheetContent size={"full"}>
        <SheetHeader>
          <SheetClose className="mr-auto">
            <X />
          </SheetClose>
          {siteConfig.mainNav.length && (
            <nav className="gap-6 flex flex-col pt-5">
              {siteConfig.mainNav?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "text-2xl flex text-foreground items-center font-medium opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
              <Link
                href={"/auth"}
                className="mr-auto text-2xl font-medium text-purple-500"
              >
                Login
              </Link>
              <div className="mr-auto">
                <ThemeToggle />
              </div>
            </nav>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
