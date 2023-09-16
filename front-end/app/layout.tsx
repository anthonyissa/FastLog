"use client"

import "@/styles/globals.css"
import React, { useEffect } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'


import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

import { AppWrapper } from "./session-context"
import Head from "next/head"
import { siteConfig } from "@/config/site"


interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <Head>
      <title>{siteConfig.title}</title>
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
      <meta property="og:image" content={"/thumbnail.png"} key={"thumbnail.png"} />
      {/* <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} /> */}
    </Head>
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
                <div className="flex-1">{children}</div>
              </div>
            </AppWrapper>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
