
import { useEffect } from "react";
import { useAppContext } from "../session-context";
import { useRouter } from "next/navigation";

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("sb-rmmesvdmxmsxcadamayp-auth-token")
  return JSON.parse(accessToken || "{}")["access_token"];
}

const withAuth = (Component : any) => {
  const Auth = (props : any) => {
    const router = useRouter();
    const { session } = useAppContext();

    useEffect(() => {
      if (!session) router.push("/auth");
    });

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;