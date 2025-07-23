import campaignABI from './abis/Campaign.json';

export function getCampaignConfig(address: string) {
  return {
    address: address,
    abi: campaignABI,
  };
}
