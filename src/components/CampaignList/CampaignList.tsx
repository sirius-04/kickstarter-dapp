'use client';

import { useDeployedCampaigns } from "@/lib/hooks/useDeployedCampaigns";
import { CardTitle, CardDescription, Card, CardContent } from "@/components/ui/card";

export default function CampaignList() {

  const { campaigns, isPending, error } = useDeployedCampaigns();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  return (
    <>
      {campaigns?.map(campaign => (
        <Card key={campaign} className="@container/card mb-2">
          <CardContent>
            <CardTitle><h4>{campaign}</h4></CardTitle>
            <CardDescription className=""><a href={`/campaigns/${campaign}`} className="ml-auto inline-block text-sm underline-offset-4 hover:underline">View</a></CardDescription>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
