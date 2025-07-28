"use client";

import { useReadContract, useWatchContractEvent } from "wagmi";
import { campaignFactoryConfig } from "../contracts";
import { config } from "@/config";

export function useDeployedCampaigns() {
  const { data, isPending, error, refetch } = useReadContract({
    abi: campaignFactoryConfig.abi,
    address: campaignFactoryConfig.address,
    functionName: "getDeployedCampaigns",
  });

  useWatchContractEvent({
    ...campaignFactoryConfig,
    eventName: "CampaignCreated",
    config,
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  });

  return {
    campaigns: data as `0x${string}`[] | undefined,
    isPending: isPending,
    error: error,
    refetch,
  };
}
