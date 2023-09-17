import { siteConfig } from "@/config/site";

export default function Logo() {
  return (
    <div className="flex items-center justify-center font-bold dark:text-gray-200 text-gray-800 text-xl">
      <img
        src="/fastlog-logo.png"
        alt="Fastlog Logo"
        className="hidden dark:block h-8 w-auto mt-0.5"
      />
      <img
        src="/fastlog-logo-dark.png"
        alt="Fastlog Logo"
        className="block dark:hidden h-8 w-auto mt-0.5"
      />
      {siteConfig.name}
    </div>
  );
}
