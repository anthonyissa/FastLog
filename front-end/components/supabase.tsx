import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { createClient } from "@supabase/supabase-js"

import { useAppContext } from "@/app/session-context"

// tuto
//https://www.youtube.com/watch?v=EOppukfgL_o&ab_channel=DailyWebCoding
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

export const signOut = async () => {
  supabase.auth
    .signOut()
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      window.location.reload()
    })
}

export const Supabase = () => {
  const { session } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push("/apps")
    }
  })
  
  return (
    <div className="w-80 mx-auto">
      <Auth
        supabaseClient={supabase}
        appearance={{
          extend: true,
          className: {
            button: "bg-red-500",
          },
          theme: ThemeSupa,
        }}
        providers={["github"]}
      />
    </div>
  )
}
