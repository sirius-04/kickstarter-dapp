import { useReadContract } from "wagmi";
import { campaignFactoryConfig } from "../contracts";

export function useDeployedCampaigns() {
  const { data, isPending, error } = useReadContract({
    abi: campaignFactoryConfig.abi,
    address: campaignFactoryConfig.address,
    functionName: "getDeployedCampaigns",
  });

  return {
    campaigns: data as `0x${string}`[] | undefined,
    isPending: isPending,
    error: error,
  };
}
