import { Loading } from "@/components/loading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import {
  createUserWebhook,
  deleteUserWebhook,
  editUserWebhook,
  fetchWebhooks,
} from "@/services/settings";
import { Webhook } from "@/types/Webhook";
import { Pen, PlusIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export const WebhookDialog = ({
  webhookToEdit,
  createFunction,
}: {
  webhookToEdit?: Webhook;
  createFunction: Function;
}) => {
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("GET");
  const [body, setBody] = useState<string>("");

  const isWebHookValid = () => {
    if (url.trim().length === 0) return false;
    return method === "GET" || (method === "POST" && body.length > 0);
  };

  useEffect(() => {
    if (webhookToEdit) {
      setUrl(webhookToEdit.url);
      setName(webhookToEdit.name);
      setMethod(webhookToEdit.method);
      setBody(webhookToEdit.body || "");
    }
  }, [webhookToEdit]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {webhookToEdit ? (
          <Button variant={"ghost"}>
            <Pen width={16} />
          </Button>
        ) : (
          <Button variant={"secondary"} className="w-48 ml-auto mb-3 ">
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
            <a
              href={siteConfig.links.docs + "webhooks"}
              rel="noreferrer"
              target="_blank"
              className="text-purple-500 hover:underline"
            >
              Learn more about webhooks
            </a>

            <Input
              className="my-3"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              value={name}
            />
            <div className="flex gap-3 mb-3">
              <Input
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL"
                value={url}
              />
              <Select
                defaultValue="GET"
                value={method}
                onValueChange={(value) => {
                  setMethod(value);
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
              createFunction(
                {
                  id: webhookToEdit?.id,
                  name,
                  url,
                  method,
                  body,
                },
                webhookToEdit ? true : false
              )
            }
          >
            {webhookToEdit ? "Save" : "Create"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const Webhooks = ({ session }: { session: any }) => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);

  const getWebhooks = async () => {
    setLoading(true);
    setWebhooks(await fetchWebhooks());
    setLoading(false);
  };

  const deleteWebhook = async (id: string) => {
    await deleteUserWebhook(id);
    setWebhooks(webhooks.filter((webhook) => webhook.id != id));
  };

  const createWebhook = async (webhook: Webhook, edit: boolean = false) => {
    if (edit) {
      await editUserWebhook(webhook);
    } else {
      await createUserWebhook(webhook);
    }
    await getWebhooks();
  };

  useEffect(() => {
    getWebhooks();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl ">Webhook Settings</h1>
      <Separator className="my-10" />
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
                  <h1>{webhook.name}</h1>
                  <Badge className="ml-auto mr-3 bg-blue-500">
                    {webhook.method}
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="break-words">
                  {webhook.url}
                  {webhook.body && "Body: " + webhook.body}
                  <div className="flex gap-3 justify-end">
                    <WebhookDialog
                      createFunction={createWebhook}
                      webhookToEdit={webhook}
                    />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={"destructive"}>
                          <Trash width={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="">
                            Delete webhook
                          </AlertDialogTitle>
                          <AlertDialogDescription className="mb-5">
                            Are you sure you want to delete this webhook?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteWebhook(webhook.id!)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
};
