'use client';

import { useReadContract } from 'wagmi';
import { campaignFactoryConfig } from '@/lib/contracts';

export default function CampaignList() {
  const { data, isPending, error } = useReadContract({
    abi: campaignFactoryConfig.abi,
    address: campaignFactoryConfig.address,
    functionName: 'getDeployedCampaigns',
  });

  const campaigns = data as `0x${string}`[] | undefined;

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
