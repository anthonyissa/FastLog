import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export const Profile = ({ session }: { session: any }) => {
  const [idCopied, setIdCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(session.user.id);
    setIdCopied(true);
    setTimeout(() => setIdCopied(false), 2000);
  };

  return (
    <div>
      <h1 className="text-3xl ">Profile Settings</h1>
      <Separator className="my-10" />
      <h1 className="text-xl font-bold">General Informations</h1>
      <div>{/* <Input></Input> */}</div>
      <Alert>
        <AlertTitle>{session.user.email}</AlertTitle>
        <AlertDescription>
          Manage your account settings and set e-mail preferences.
        </AlertDescription>
      </Alert>
      <div className="mt-3">
        <Button onClick={handleCopyId} variant="ghost" className="w-32">
          {idCopied ? "Copied ✅" : "Copy User ID"}
        </Button>
      </div>
    </div>
  );
};
