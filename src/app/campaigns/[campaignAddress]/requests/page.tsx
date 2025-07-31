'use client'

import CampaignLayout from "@/components/CampaignLayout/CampaignLayout";
import { useParams } from "next/navigation";

export default function RequestsPage() {
  const params = useParams<{ campaignAddress: `0x${string}` }>();
  const address = params.campaignAddress;

  return (
    <CampaignLayout title={`Campaign ${address} Requests`}>
      <div>
        
      </div>
    </CampaignLayout>
  );
}