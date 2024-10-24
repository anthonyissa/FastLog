import { Button } from "./ui/button";
import { getAccessToken } from "@/app/auth/auth";
import { useAppContext } from "@/app/session-context";
import { getUserInvoice } from "@/services/lightning";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { requestProvider } from "webln";

export default function Payment() {
  const [invoice, setInvoice] = useState<any>(null);
  const { checkPayment } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    getInvoice();
  }, []);

  const getInvoice = async () => {
    const invoice = await getUserInvoice();
    setInvoice(invoice);
  };

  const managePayment = async () => {
    try {
      if (!invoice) return;
      const webln = await requestProvider();
      await webln.sendPayment(invoice.request);
    } catch (error) {
      console.error(error);
    } finally {
      const paid = await checkPayment();
      if (paid) router.push("/dashboard");
    }
  };

  return <Button onClick={managePayment}>Upgrade</Button>;
}
