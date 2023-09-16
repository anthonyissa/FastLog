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
        <title>Fastlog</title>
        {/* <Head children={children} /> */}
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
