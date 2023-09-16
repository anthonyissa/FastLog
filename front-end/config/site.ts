export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "🚀 Fastlog",
  title: "Fastlog",
  description:
    "Fastlog is a simple monitoring tool that allows you to monitor your applications and APIs with ease. Monitor your apps in seconds today.",
  mainNav: [{}],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://personal-88.gitbook.io/fastlog/",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  },
}
