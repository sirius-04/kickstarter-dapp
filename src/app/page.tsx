import CampaignList from "@/components/CampaignList/CampaignList";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import CreateCampaign from "@/components/CreateCampaign/CreateCampaign";

export default function Home() {
  return (
    <>
      <ConnectWallet />
      <div>
        <CampaignList />
        <CreateCampaign></CreateCampaign>
      </div>
    </>
  );
}
