'use client'

import { Button } from '@/components/ui/button';
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

export default function ConnectWallet() {
  const { open, close } = useAppKit();

  return (
    <appkit-button></appkit-button>
  );
}
