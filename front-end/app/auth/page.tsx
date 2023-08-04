"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Supabase, supabase } from "@/components/supabase"

export default function AuthPage() {
  const [session, setSession] = useState<any>(null)
  const router = useRouter()

  const getSession = async () => {
    const s = await supabase.auth.getSession()
    setSession(s)
  }

  useEffect(() => {
    getSession()
  }, [])

  //   useEffect(() => {
  //     if (session) {
  //       router.push("/apps")
  //     }
  //   }, [session])

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Supabase />
    </section>
  )
}
