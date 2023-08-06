"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteUserApp, editUserApp } from "@/services/apps"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogDescription } from "@radix-ui/react-dialog"
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Check,
  Cog,
  Copy,
  FileWarning,
  Terminal,
} from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { App } from "@/types/App"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Head from "next/head"

export function Settings({
  app,
  changeSettingsCallback,
}: {
  app: App
  changeSettingsCallback: Function
}) {
  const [tab, setTab] = useState<"general" | "danger" | "notifications">("general")
  const [idCopied, setIdCopied] = useState(false)
  const router = useRouter()

  const FormSchema = z.object({
    "app-name": z
      .string()
      .min(4, {
        message: "App name must be at least 2 characters.",
      })
      .max(20, {
        message: "App name must be at most 20 characters.",
      })
      .default(app.name),
    "status-threshold": z
      .number()
      .min(30, {
        message: "Status threshold must be at least 30 seconds.",
      })
      .default(app.status_threshold / 1000),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { register } = form

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (
      data["app-name"] === app.name &&
      data["status-threshold"] === app.status_threshold / 1000
    ) {
      return
    }
    await editUserApp(app.id, data["app-name"], data["status-threshold"] * 1000)
    await changeSettingsCallback()
  }

  const deleteApp = async (id: string) => {
    try {
      await deleteUserApp(id)
    } finally {
      router.push("/apps")
    }
  }

  const copyId = () => {
    navigator.clipboard.writeText(app.id)
    setIdCopied(true)
    setTimeout(() => {
      setIdCopied(false)
    }, 2000)
  }

  return (
    <div className="flex">
      <div className="w-3/12 px-5 flex flex-col items-start border-r mr-8">
        <Button
          variant="ghost"
          className="mb-2 w-full flex justify-start"
          onClick={() => setTab("general")}
        >
          <Cog className="mr-2" size={16} />
          General
        </Button>
        <Button
          variant="ghost"
          className="mb-2 w-full flex justify-start"
          onClick={() => setTab("notifications")}
        >
          <Bell className="mr-2" size={16} />
          Notifications
        </Button>
        <Button
          variant="ghost"
          className="mb-2 w-full flex justify-start"
          onClick={() => setTab("danger")}
        >
          <AlertTriangle className="mr-2" size={16} />
          Danger
        </Button>
      </div>
      {tab === "general" && (
        <div className="w-9/12">
          <Alert variant="default">
            <AlertTitle>{app.name}</AlertTitle>
            <AlertDescription className="flex items-center">
              {app.id}
              {
                idCopied ? (
                  <Check width={15} className="ml-3" />
                ) : (
                  <Copy
                    width={15}
                    className="ml-3 cursor-pointer"
                    onClick={() => copyId()}
                  />
                )
              }
            </AlertDescription>
          </Alert>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-3 grid grid-cols-2 gap-10"
            >
              <div>
                <FormField
                  control={form.control}
                  name="app-name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>App name</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={app.name}
                          placeholder="App name"
                          {...register("app-name")}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your app&apos;s name. It will be displayed in
                        the dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="status-threshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status threshold</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={app.status_threshold / 1000}
                          type="number"
                          placeholder="Status threshold in seconds"
                          {...register("status-threshold", {
                            valueAsNumber: true,
                          })}
                        />
                      </FormControl>
                      <FormDescription>
                        Select the status threshold, if we don&apos;t receive a
                        status update within this time, we will consider the app
                        as down.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-20">
                Save
              </Button>
            </form>
          </Form>
        </div>
      )}
      {tab === "danger" && (
        <div className="w-9/12">
          <Alert variant="destructive">
            <AlertTitle>Delete this app</AlertTitle>
            <AlertDescription>
              This action is irreversible. All data associated with this app
              will be deleted.
            </AlertDescription>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="mt-3">
                  Delete App
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete App</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this app? This action is
                    irreversible. All data associated with this app will be
                    deleted.
                  </DialogDescription>
                </DialogHeader>
                <Button
                  variant="destructive"
                  className="mt-3"
                  onClick={() => deleteApp(app.id)}
                >
                  Delete
                </Button>
              </DialogContent>
            </Dialog>
          </Alert>
        </div>
      )}
    </div>
  )
}
