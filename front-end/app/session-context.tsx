"use client";

import { supabase } from "@/components/supabase";
import { checkIfUserPaid } from "@/services/lightning";
import { createContext, use, useContext, useEffect, useState } from "react";

const AppContext = createContext<{
  session: any;
  setSession: (session: any) => void;
  userId: string;
  setUserId: (userId: string) => void;
  ready: boolean;
  premium: boolean;
  checkPayment: () => Promise<boolean>;
}>({
  session: null,
  setSession: () => {},
  userId: "",
  setUserId: () => {},
  ready: false,
  premium: false,
  checkPayment: async () => false,
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [userId, setUserId] = useState<string>("");
  const [ready, setReady] = useState<boolean>(false);
  const [premium, setUserPremium] = useState<boolean>(false);

  const checkPayment = async () => {
    const status = await checkIfUserPaid();
    setUserPremium(status.paid);
    return status.paid;
  };

  const updateSession = async () => {
    const s = await supabase.auth.getSession();
    setSession(s.data.session);
    setUserId(s.data.session?.user?.id || "");
  };

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      updateSession();
    }
  });

  useEffect(() => {
    updateSession();
    checkPayment();
    setReady(true);
  }, []);

  return (
    <AppContext.Provider
      value={{
        session,
        setSession,
        userId,
        setUserId,
        ready,
        premium,
        checkPayment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
