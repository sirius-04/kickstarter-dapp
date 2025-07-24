'use client'

import CampaignList from "@/components/CampaignList/CampaignList";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import CreateCampaign from "@/components/CreateCampaign/CreateCampaign";
import { useAppKitAccount } from "@reown/appkit/react";

export default function Home() {
  const { isConnected } = useAppKitAccount();

  let dashboard = (
    <>
      <h2>Open Campaigns</h2>
      <div className="flex justify-between gap-6 py-2">
        <div className="flex-3">
          <CampaignList />
        </div>

        <div className="flex-1">
          <div className="flex justify-end">
            <CreateCampaign />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {isConnected ? dashboard : ''}
    </>
  );
}
