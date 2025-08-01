import { Abi } from 'viem';
import campaignABI from './abis/Campaign.json';

export function getCampaignConfig(address: string) {
  return {
    address: address as `0x${string}`,
    abi: campaignABI as Abi,
  };
}
