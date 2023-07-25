"use client"

import { useEffect, useState } from "react"
import { createNewApp, deleteUserApp, fetchApps } from "@/services/apps"
import {
  Loader2Icon,
  Plus,
  Settings2,
  Trash,
  Trash2,
  Trash2Icon,
} from "lucide-react"

import { App } from "@/types/App"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/status-badge"
import { useRouter } from "next/navigation"

export default function AppsPage() {
  const [apps, setApps] = useState<App[]>([])
  const [newApp, setNewApp] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  const getApps = async (user: string) => {
    setLoading(true)
    try {
      setApps(await fetchApps(user))
    } finally {
      setLoading(false)
    }
  }

  const openApp = (name: string) => {
    router.push(`/apps/${name}`)
  }

  const createApp = async () => {
    try {
      await createNewApp(newApp)
    } finally {
      setNewApp("")
      await getApps("antho")
    }
  }

  const deleteApp = async (name: string) => {
    try {
      await deleteUserApp(name)
    } finally {
      await getApps("antho")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getApps("antho")
    }
    fetchData().catch(console.error)
  }, [])

  return (
    <div className="container mx-auto">
      {(loading && (
        <div className="w-full mt-5 flex items-center justify-center">
          <img src="/loading.svg" className="w-10 h-10"></img>
        </div>
      )) || (
        <div className="flex flex-col py-5">
          <div className="w-full flex justify-start py-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 w-5 h-5"></Plus> New App
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="mb-3">
                    New app
                  </AlertDialogTitle>
                  <AlertDialogDescription className="mb-5">
                    Enter the name of your new app
                    </AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={newApp}
                    onChange={(e) => {
                      setNewApp(e.target.value)
                    }}
                  />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => createApp()}>
                    Create
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {apps.map((app) => (
              <Card>
                <CardHeader
                  onClick={() => openApp(app.name)}
                  className="cursor-pointer"
                >
                  <CardTitle>
                    {app.name.substring(0, 15)}
                    {app.name.length > 15 ? "..." : ""}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-between">
                <StatusBadge status={app.status} />
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <Settings2 className="h-6 w-6 dark:text-gray-300" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => deleteApp(app.name)}
                        className="cursor-pointer"
                      >
                        <Trash2 className="mr-2 w-4 h-4 z-50"></Trash2>Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
