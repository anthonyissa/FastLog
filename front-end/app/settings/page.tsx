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
        <div className="w-full mt-5 flex items-center justify-center">
          <Loading />
        </div>
      )}
      {session && (
        <div className="flex w-full">
          <div className="w-3/12 px-5 flex flex-col items-start border-r mr-8">
            <Button
              variant="ghost"
              className="mb-2 w-full flex justify-start"
              onClick={() => setTab("profile")}
            >
              <User className="mr-2" size={16} />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="mb-2 w-full flex justify-start"
              onClick={() => setTab("webhooks")}
            >
              <Webhook className="mr-2" size={16} />
              Webhooks
            </Button>
          </div>
          <div className="w-9/12">
            {tab === "profile" && <Profile session={session} />}
            {tab === "webhooks" && <Webhooks session={session} />}
          </div>
        </div>
      )}
    </section>
  );
};

export default withAuth(Settings);
