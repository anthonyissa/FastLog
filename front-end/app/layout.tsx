"use client";

import "@/styles/globals.css";
import AOS from "aos";
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import { AppWrapper } from "./session-context";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });
  return (
    <>
      <html lang="en" suppressHydrationWarning className="dark">
        <head>
          <title>{siteConfig.title}</title>
          <link rel="icon" href="/fastlog-logo-full.png" />
          <meta name="robots" content="follow, index" />
          <meta name="description" content={siteConfig.description} />
          {/* <meta
        property="og:url"
        content={`${siteConfig.siteUrl}${router.asPath}`}
      /> */}
          <meta property="og:type" content={"website"} />
          <meta property="og:site_name" content={siteConfig.title} />
          <meta property="og:description" content={siteConfig.description} />
          <meta property="og:title" content={siteConfig.title} />
          <meta
            property="og:image"
            content={"/thumbnail.png"}
            key={"thumbnail.png"}
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={"@fastlog_app"} />
          <meta name="twitter:title" content={siteConfig.title} />
          <meta name="twitter:description" content={siteConfig.description} />
          <meta name="twitter:image" content={"/thumbnail.png"} />
        </head>
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AppWrapper>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1 pt-20">{children}</div>
              </div>
            </AppWrapper>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
