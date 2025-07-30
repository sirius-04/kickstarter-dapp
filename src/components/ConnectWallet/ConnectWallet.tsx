'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppKitAccount } from "@reown/appkit/react";

export default function ConnectWallet() {
  const { isConnected } = useAppKitAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push('/campaigns');
    }
  }, [isConnected, router]);

  return (
    <appkit-button></appkit-button>
  );
}
