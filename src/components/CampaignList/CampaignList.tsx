'use client';

import { useDeployedCampaigns } from "@/lib/hooks/useDeployedCampaigns";

export default function CampaignList() {
  const { campaigns, isPending, error } = useDeployedCampaigns();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  return (
    <ul>
      {campaigns?.map((campaign) => (
        <li key={campaign}>
          <a href={`/campaigns/${campaign}`}>{campaign}</a>
        </li>
      ))}
    </ul>
  );
}
