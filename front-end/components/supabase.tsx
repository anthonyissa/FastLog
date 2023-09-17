import { useAppContext } from "@/app/session-context";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// tuto
//https://www.youtube.com/watch?v=EOppukfgL_o&ab_channel=DailyWebCoding
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export const signOut = async () => {
  supabase.auth
    .signOut()
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      window.location.reload();
    });
};

export const Supabase = () => {
  const { session } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/apps");
    }
  });

  return (
    <div className="w-80 mx-auto">
      <Auth
        redirectTo="/apps"
        supabaseClient={supabase}
        appearance={{
          extend: true,
          className: {
            button: "dark:auth-btn-dark auth-btn",
            input: "dark:auth-input-dark auth-input",
          },
          theme: ThemeSupa,
        }}
        providers={["github"]}
      />
    </div>
  );
};
