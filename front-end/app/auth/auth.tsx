import { useAppContext } from "../session-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(
    "sb-rmmesvdmxmsxcadamayp-auth-token"
  );
  return JSON.parse(accessToken || "{}")["access_token"];
};

const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const { session, ready, premium } = useAppContext();

    useEffect(() => {
      if (!ready) return;
      if (!session) router.push("/auth");
      if (!premium) router.push("/upgrade");
    });

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
