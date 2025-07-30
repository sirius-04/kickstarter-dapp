'use client'

import { useAppKitAccount } from "@reown/appkit/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ConnectWallet() {
  const { isConnected } = useAppKitAccount();
  const router = useRouter();
  const wasConnected = useRef(false);

  useEffect(() => {
    if (isConnected) {
      wasConnected.current = true;
    } else if (wasConnected.current) {
      router.push('/');
    }
  }, [isConnected, router]);

  return (
    <appkit-button></appkit-button>
  );
}
