export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "🚀 FastLog",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://personal-88.gitbook.io/fastlog/",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  },
}
