"use client"

import CallToAction from "@/components/ui/landing/call-to-action"
import Features from "@/components/ui/landing/features"
import Footer from "@/components/ui/landing/footer"
import Hero from "@/components/ui/landing/hero"
import Zigzag from "@/components/ui/landing/zigzag"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Hero />
      <Zigzag />
      <Features />
      <CallToAction />
      <Footer />
    </section>
  )
}
