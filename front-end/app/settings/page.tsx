"use client";

// Assuming Button is a part of your UI library
import withAuth from "../auth/auth";
import { useAppContext } from "../session-context";
import { Profile } from "./profile";
import { Webhooks } from "./webhooks";
import { Loading } from "@/components/loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { User, Webhook } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const { session } = useAppContext();
  const [tab, setTab] = useState<"profile" | "webhooks">("profile");

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {!session && (
        <div className="mt-5 flex w-full items-center justify-center">
          <Loading />
        </div>
      )}
      {session && (
        <div className="flex w-full">
          <div className="mr-5 flex w-2/12 flex-col items-start  text-gray-500">
            <Button
              variant="ghost"
              className={`text-base mb-2 flex w-full justify-start ${
                tab === "profile" ? "text-gray-800 dark:text-white" : ""
              }`}
              onClick={() => setTab("profile")}
            >
              <User
                className={`mr-3 ${
                  tab === "profile" ? "text-purple-500 " : ""
                }`}
                size={22}
              />
              Profile
            </Button>
            <Button
              variant="ghost"
              className={`text-base mb-2 flex w-full justify-start ${
                tab === "webhooks" ? "text-gray-800 dark:text-white" : ""
              }`}
              onClick={() => setTab("webhooks")}
            >
              <Webhook
                className={`mr-3 ${
                  tab === "webhooks" ? "text-purple-500 " : ""
                }`}
                size={22}
              />
              Webhooks
            </Button>
          </div>
          <div className="w-10/12">
            {tab === "profile" && <Profile session={session} />}
            {tab === "webhooks" && <Webhooks session={session} />}
          </div>
        </div>
      )}
    </section>
  );
};

export default withAuth(Settings);
