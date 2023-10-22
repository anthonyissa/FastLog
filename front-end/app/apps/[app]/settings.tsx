"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { deleteUserApp, editUserApp, setWebhook } from "@/services/apps";
import { fetchWebhooks, testUserWebhook } from "@/services/settings";
import { App } from "@/types/App";
import { Webhook } from "@/types/Webhook";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  AlertCircle,
  AlertCircleIcon,
  AlertTriangle,
  Bell,
  Check,
  ChevronsUpDown,
  Cog,
  Copy,
  FileWarning,
  Plus,
  Terminal,
  Webhook as WebhookIcon,
} from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function Settings({
  app,
  changeSettingsCallback,
}: {
  app: App;
  changeSettingsCallback: Function;
}) {
  const [tab, setTab] = useState<"general" | "danger" | "notifications">(
    "general"
  );
  const [idCopied, setIdCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<string | null>("");
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [testDone, setTestDone] = useState(false);
  const [testResult, setTestResult] = useState<null | "success" | "error">(
    null
  );
  const router = useRouter();

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
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { register } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (
      data["app-name"] === app.name &&
      data["status-threshold"] === app.status_threshold / 1000
    ) {
      return;
    }
    await editUserApp(
      app.id,
      data["app-name"],
      data["status-threshold"] * 1000
    );
    await changeSettingsCallback();
  }

  const deleteApp = async (id: string) => {
    try {
      await deleteUserApp(id);
    } finally {
      router.push("/apps");
    }
  };

  const copyId = () => {
    navigator.clipboard.writeText(app.id);
    setIdCopied(true);
    setTimeout(() => {
      setIdCopied(false);
    }, 2000);
  };

  const getWebhooks = async () => {
    setWebhooks(await fetchWebhooks());
  };

  const handleWebhookSelect = (currentValue: string) => {
    const toReset = currentValue === webhookStatus;
    if (toReset) {
      setWebhookStatus("");
      setWebhook(app.id, null);
      app.webhook_id = null;
    } else {
      setWebhookStatus(currentValue);
      const newWebhookdId =
        webhooks.find(
          (webhook) => webhook.url.toLowerCase() === currentValue.toLowerCase()
        )?.id || null;
      setWebhook(app.id, newWebhookdId);
      app.webhook_id = newWebhookdId;
    }
    setOpen(false);
  };

  const testNotification = async () => {
    setTestDone(true);
    const newWebhookdId = webhooks.find(
      (webhook) => webhook.url.toLowerCase() === webhookStatus?.toLowerCase()
    )!.id;
    try {
      // @ts-ignore
      await testUserWebhook(newWebhookdId);
      setTestResult("success");
    } catch (e) {
      setTestResult("error");
    }
  };

  useEffect(() => {
    getWebhooks();
  }, []);

  useEffect(() => {
    if (app.webhook_id) {
      setWebhookStatus(
        webhooks.find((webhook) => webhook.id === app.webhook_id)?.url || ""
      );
    }
  }, [webhooks]);

  return (
    <div className="flex mt-6">
      <div className="w-2/12 px-5 flex flex-col items-start mr-8 text-gray-500">
        <Button
          variant="ghost"
          className={`text-base mb-2 flex w-full justify-start ${
            tab === "general" ? "text-gray-800 dark:text-white" : ""
          }`}
          onClick={() => setTab("general")}
        >
          <Cog
            className={`mr-3 ${tab === "general" ? "text-purple-500 " : ""}`}
            size={16}
          />
          General
        </Button>
        <Button
          variant="ghost"
          className={`text-base mb-2 flex w-full justify-start ${
            tab === "notifications" ? "text-gray-800 dark:text-white" : ""
          }`}
          onClick={() => setTab("notifications")}
        >
          <Bell
            className={`mr-3 ${
              tab === "notifications" ? "text-purple-500 " : ""
            }`}
            size={16}
          />
          Notifications
        </Button>
        <Button
          variant="ghost"
          className={`text-base mb-2 flex w-full justify-start ${
            tab === "danger" ? "text-gray-800 dark:text-white" : ""
          }`}
          onClick={() => setTab("danger")}
        >
          <AlertTriangle
            className={`mr-3 ${tab === "danger" ? "text-purple-500 " : ""}`}
            size={16}
          />
          Danger
        </Button>
      </div>
      {tab === "general" && (
        <div className="w-10/12">
          <Alert variant="default">
            <AlertTitle>{app.name}</AlertTitle>
            <AlertDescription className="flex items-center">
              {app.id}
              {idCopied ? (
                <Check width={15} className="ml-3" />
              ) : (
                <Copy
                  width={15}
                  className="ml-3 cursor-pointer"
                  onClick={() => copyId()}
                />
              )}
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
                        as down. 0 to disable.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-20 mt-[-20px]">
                Save
              </Button>
            </form>
          </Form>
        </div>
      )}
      {tab === "danger" && (
        <div className="w-10/12">
          <Alert variant="destructive">
            <AlertTitle className="flex items-center">
              <AlertCircleIcon width={16} className="mr-2" /> Delete this app
            </AlertTitle>
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
      {tab === "notifications" && (
        <div className="w-10/12 flex flex-col">
          <Alert variant="default">
            <AlertTitle className="flex items-center">
              <WebhookIcon width={16} className="mr-2" /> Notification webhook
            </AlertTitle>
            <AlertDescription className="mb-3">
              Choose the webhook you want to use to receive status updates for
              this app.<br></br>
              <a
                href={siteConfig.links.docs + "webhooks"}
                target="_blank"
                rel="noreferrer"
                className="text-purple-500 hover:underline"
              >
                Learn more about webhooks
              </a>
            </AlertDescription>
            <div className="flex items-center">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {webhookStatus
                      ? webhookStatus.length > 20
                        ? webhookStatus.substring(0, 20) + "..."
                        : webhookStatus
                      : "Select a webhook"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search webhook..." />
                    <CommandEmpty>
                      No webhooks found.<br></br>
                      <Button
                        variant={"secondary"}
                        className="mt-3"
                        onClick={() => router.push("/settings")}
                      >
                        Create webhook
                      </Button>
                    </CommandEmpty>
                    <CommandGroup>
                      {webhooks.map((webhook) => (
                        <CommandItem
                          key={webhook.url}
                          onSelect={(currentValue) =>
                            handleWebhookSelect(currentValue)
                          }
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              webhookStatus === webhook.url
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {webhook.url}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button
                variant="outline"
                className="ml-3"
                onClick={() => router.push("/settings?t=webhooks")}
              >
                <Plus size={16} />
              </Button>
              {webhookStatus && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        disabled={testDone}
                        variant="outline"
                        className="ml-3"
                        onClick={() => testNotification()}
                      >
                        <Bell size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Send a test notification</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {(testDone && testResult === "success" && (
                <p className="ml-3 text-sm text-green-500">
                  Notification sent successfully!
                </p>
              )) ||
                (testDone && testResult === "error" && (
                  <p className="ml-3 text-sm text-red-500">
                    Failed to send notification, check your webhook.
                  </p>
                ))}
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
}
