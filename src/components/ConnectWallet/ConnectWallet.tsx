'use client'

import Button from '@/components/Button/Button';
import { useConnect, useDisconnect, useAccount } from 'wagmi';

export default function ConnectWallet() {
  const { connect, connectors, error, status } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();

  let content = (
    <>
      <h1 className="font-semibold">Connect Wallet</h1>
      {connectors.map((connector) => (
        <Button
          variant='primary'
          key={connector.id}
          onClick={() => connect({ connector })}>
          {connector.name}
        </Button>
      ))}
    </>
  );

  if (isConnected) {
    content = (
      <>
        <p>Connected: {address}</p>
        <Button variant='danger' onClick={() => disconnect()}>Disconnect</Button>
      </>
    );
  }

  return (
    <div className="p-2">
      {content}
      {status === 'pending' && <p>Connecting...</p>}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  )
}
