import Logo from "./ui/logo";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import Link from "next/link";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10 ">
      <Link href="/" className="flex items-center space-x-2">
        <Logo />
      </Link>
    </div>
  );
}
