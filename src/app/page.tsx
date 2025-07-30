'use client'

import { useAppKitAccount } from "@reown/appkit/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {
  const { isConnected } = useAppKitAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push('/campaigns');
    }
  }, [isConnected, router]);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}
