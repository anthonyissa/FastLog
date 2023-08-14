import { useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export const Profile = ({ session }: { session: any }) => {
  const [idCopied, setIdCopied] = useState(false)

  const handleCopyId = () => {
    navigator.clipboard.writeText(session.user.id)
    setIdCopied(true)
    setTimeout(() => setIdCopied(false), 2000)
  }

  return (
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
  )
}
