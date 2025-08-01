import CampaignDetailsClient from "./CampaignDetailsClient";

export default async function CampaignDetailsPage({ params }: { params: Promise<{ campaignAddress: `0x${string}` }>; }) {
  return (
    <CampaignDetailsClient address={(await params).campaignAddress} />
  );
}