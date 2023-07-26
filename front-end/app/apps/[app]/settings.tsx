"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { App } from "@/types/App"
import { Button } from "@/components/ui/button"
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
import { editUserApp } from "@/services/apps"



export function Settings({ app, changeSettingsCallback }: { app: App, changeSettingsCallback: Function }) {
  const FormSchema = z.object({
    "app-name": z
      .string()
      .min(4, {
        message: "App name must be at least 2 characters.",
      }).max(20, {
        message: "App name must be at most 20 characters.",
      }).default(app.name),
    "status-threshold": z.number().min(30, {
      message: "Status threshold must be at least 30 seconds.",
    }).default(app.status_threshold / 1000),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { register } = form

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data["app-name"] === app.name && data["status-threshold"] === app.status_threshold / 1000) {
      return
    }
    await editUserApp(app.id, data["app-name"], data["status-threshold"] * 1000)
    await changeSettingsCallback()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 grid grid-cols-2 gap-10"
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
                  This is your app's name. It will be displayed in the
                  dashboard.
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
                    {...register("status-threshold", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>
                  Select the status threshold, if we don't receive a status
                  update within this time, we will consider the app as down.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-3 w-20">
          Save
        </Button>
      </form>
    </Form>
  )
}
