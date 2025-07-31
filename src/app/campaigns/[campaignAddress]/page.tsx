import CampaignDetailsClient from "./CampaignDetailsClient";

export default function CampaignDetailsPage({ params }: { params: { campaignAddress: `0x${string}` }; }) {
  return (
    <CampaignDetailsClient address={params.campaignAddress} />
  );
}