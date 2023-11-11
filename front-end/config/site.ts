export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Fastlog",
  title: "Fastlog",
  description:
    "Fastlog is a simple monitoring tool that allows you to monitor your applications and APIs with ease. Monitor your apps in seconds today.",
  mainNav: [
    {
      title: "Docs",
      href: "https://personal-88.gitbook.io/fastlog/",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
  ],
  links: {
    twitter: "https://twitter.com/fastlog_app",
    discord: "https://discord.gg/8Yu3CRrven",
    docs: "https://personal-88.gitbook.io/fastlog/",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  },
};
