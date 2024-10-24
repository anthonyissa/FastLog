"use client";

import withAuth from "@/app/auth/auth";
import Payment from "@/components/payment";

function UpgradePage() {
  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center gap-3">
      <h1 className="text-3xl font-bold">Upgrade your account</h1>
      <p>Upgrade your account to access more features</p>
      <Payment />
    </div>
  );
}

export default withAuth(UpgradePage);
