import { useReadContract } from "wagmi";
import { campaignFactoryConfig } from "@/lib/contracts";

export default function CampaignList() {
  const { data, isLoading } = useReadContract({
    abi: campaignFactoryConfig.abi,
    address: campaignFactoryConfig.address,
    functionName: 'getDeployedCampaigns',
  });
  const campaigns = data as `0x${string}`[];

  let content;

  if (isLoading) {
    content = (
      <p>Loading...</p>
    );
  } else {
    content = (
      <ul>
        {campaigns.map(campaign => (
          <li>
            <a href={`/campaigns/${campaign}`}>{campaign}</a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {content}
    </>
  )
}