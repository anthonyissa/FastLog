import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CopyIcon } from "lucide-react";
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
      <div className="mt-3 grid grid-cols-2">
        <div>
          <h1 className="font-bold text-sm pb-2">User Email</h1>
          <p className="border rounded-md px-4 w-96 py-2 flex items-center text-center">
            {session.user.email}
          </p>
        </div>
        <div>
          <h1 className="font-bold text-sm pb-2">User Id</h1>
          <p className="border rounded-md px-5 w-fit py-2 flex items-center">
            {"•••••••••••••••••••••••••••••••••"}
            <button onClick={handleCopyId} className="ml-3 text-xs">
              {idCopied ? "✅" : <CopyIcon className="w-3 h-3"></CopyIcon>}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
