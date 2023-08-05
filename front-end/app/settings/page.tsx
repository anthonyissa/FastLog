"use client"

import { useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

// Assuming Button is a part of your UI library

import withAuth from "../auth/auth"
import { useAppContext } from "../session-context"

const Settings = () => {
  const { session } = useAppContext()
  const [idCopied, setIdCopied] = useState(false)

  const handleCopyId = () => {
    navigator.clipboard.writeText(session.user.id)
    setIdCopied(true)
    setTimeout(() => setIdCopied(false), 2000)
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        {!session && (
            <div className="w-full mt-5 flex items-center justify-center">
            <img src="/loading.svg" className="w-10 h-10"></img>
          </div>
          )}
      {session && (
        <div>
          <Alert>
            <AlertTitle>{session.user.email}</AlertTitle>
            <AlertDescription>
              Manage your account settings and set e-mail preferences.
            </AlertDescription>
          </Alert>
          <div className="mt-3">

          <Button onClick={handleCopyId} variant="ghost" className="w-32">
            {idCopied ? "Copied ✅" : "Copy User ID"}
          </Button>
          </div>
        </div>
      )}
    </section>
  )
}

export default withAuth(Settings)
