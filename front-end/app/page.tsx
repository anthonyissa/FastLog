"use client"

import CallToAction from "@/components/ui/landing/call-to-action"
import Footer from "@/components/ui/landing/footer"
import Hero from "@/components/ui/landing/hero"
import Zigzag from "@/components/ui/landing/zigzag"
import UseCases from "@/components/ui/landing/usecases"
import Features from "@/components/ui/landing/features"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Hero />
      <Zigzag />
      <Features />
      <UseCases />
      <CallToAction />
      <Footer />
    </section>
  )
}
