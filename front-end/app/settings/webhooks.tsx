import { useEffect, useState } from "react"
import {
  createUserWebhook,
  deleteUserWebhook,
  editUserWebhook,
  fetchWebhooks,
} from "@/services/settings"
import { Pen, PlusIcon, Trash } from "lucide-react"

import { Webhook } from "@/types/Webhook"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loading } from "@/components/loading"
import { Badge } from "@/components/ui/badge"

export const WebhookDialog = ({
  webhookToEdit,
  createFunction,
}: {
  webhookToEdit?: Webhook
  createFunction: Function
}) => {
  const [url, setUrl] = useState<string>("")
  const [method, setMethod] = useState<string>("GET")
  const [body, setBody] = useState<string>("")

  const isWebHookValid = () => {
    if (url.trim().length === 0) return false
    return method === "GET" || (method === "POST" && body.length > 0)
  }

  useEffect(() => {
    if (webhookToEdit) {
      setUrl(webhookToEdit.url)
      setMethod(webhookToEdit.method)
      setBody(webhookToEdit.body || "")
    }
  }, [webhookToEdit])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {webhookToEdit ? (
          <Button variant={"ghost"}>
            <Pen width={16} />
          </Button>
        ) : (
          <Button variant={"secondary"} className="w-full mb-3">
            <PlusIcon className="mr-1" />
            New Webhook
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {webhookToEdit ? "Edit webhook" : "Create a new webhook"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex gap-3 mb-3 mt-3">
              <Input
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL"
                value={url}
              />
              <Select
                defaultValue="GET"
                value={method}
                onValueChange={(value) => {
                  setMethod(value)
                }}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="GET" className="cursor-pointer">
                      GET
                    </SelectItem>
                    <SelectItem value="POST" className="cursor-pointer">
                      POST
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Input
                value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Body"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={!isWebHookValid()}
            onClick={() =>
              createFunction({
                id: webhookToEdit?.id,
                url: url,
                method: method,
                body: body,
              }, webhookToEdit ? true : false)
            }
          >
            {webhookToEdit ? "Save" : "Create"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const Webhooks = ({ session }: { session: any }) => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [loading, setLoading] = useState(true)

  const getWebhooks = async () => {
    setLoading(true)
    setWebhooks(await fetchWebhooks())
    setLoading(false)
  }

  const deleteWebhook = async (id: string) => {
    await deleteUserWebhook(id)
    setWebhooks(webhooks.filter((webhook) => webhook.id != id))
  }

  const createWebhook = async (webhook: Webhook, edit: boolean = false) => {
    if (edit) {
        await editUserWebhook(webhook)
    } else {
        await createUserWebhook(webhook)
    }
    await getWebhooks()
  }

  useEffect(() => {
    getWebhooks()
  }, [])

  return (
    <div className="flex flex-col w-full">
      <WebhookDialog createFunction={createWebhook} />
      <Accordion
        type="single"
        collapsible
        className="w-full overflow-y-auto h-full overflow-x-hidden"
      >
        {loading && <Loading />}
        {webhooks.length != 0 &&
          webhooks.map((webhook, index) => {
            return (
              <AccordionItem key={index} value={`${`${index}`}`}>
                <AccordionTrigger className="flex justify-between w-full">
                    <h1 className="w-64">
                        {
                            webhook.url.length > 64 ? webhook.url.substring(0, 64) + "..." : webhook.url
                        }
                    </h1>
                    <Badge className="ml-auto mr-3 bg-blue-500">{webhook.method}</Badge>
                </AccordionTrigger>
                <AccordionContent>
                  {webhook.body && "Body: " + webhook.body}
                  <div className="flex gap-3 justify-end">
                    <WebhookDialog
                      createFunction={createWebhook}
                      webhookToEdit={webhook}
                    />
                    <Button
                      variant={"destructive"}
                      onClick={() => deleteWebhook(webhook.id!)}
                    >
                      <Trash width={16} />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
      </Accordion>
    </div>
  )
}
