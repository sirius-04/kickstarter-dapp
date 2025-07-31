'use client'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCampaignConfig } from "@/lib/contracts";
import Link from "next/link";
import { useReadContract } from "wagmi";

export default function CampaignDetailCards({ address }: { address: `0x${string}`; }) {
  const campaignConfig = getCampaignConfig(address);

  const { data, isPending } = useReadContract({
    ...campaignConfig,
    functionName: 'getSummary'
  });


  let balance: string | undefined
  let minimumContribution: string | undefined
  let requestsCount: string | undefined
  let approversCount: string | undefined
  let managerAddress: string | undefined

  if (isPending) {
    balance = minimumContribution = requestsCount = approversCount = managerAddress = "Loading...";
  } else if (data) {
    const [
      _balance,
      _minimumContribution,
      _requestsCount,
      _approversCount,
      _managerAddress,
    ] = data as readonly [bigint, bigint, bigint, bigint, `0x${string}`]

    balance = _balance.toString()
    minimumContribution = _minimumContribution.toString()
    requestsCount = _requestsCount.toString()
    approversCount = _approversCount.toString()
    managerAddress = _managerAddress
  }

  return (
    <>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Campaign Balance (ether)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {balance}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Minimum Contribution (wei)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {minimumContribution}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Number of Requests</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {requestsCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Link href={`/campaigns/${address}/requests`} className="text-muted-foreground underline-offset-4 hover:underline">
            View Requests
          </Link>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Number of Approvers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {approversCount}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Manager</CardDescription>
          <CardTitle className="text-2xl font-semibold break-all tabular-nums @[250px]/card:text-3xl">
            {managerAddress}
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  )
}
