'use client'

import CampaignList from "@/components/CampaignList/CampaignList";
import AddButton from "@/components/AddButton/AddButton";
import PopOutDialog from "@/components/PopOutDialog/PopOutDialog";
import { Input } from "@/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useAppKitAccount } from "@reown/appkit/react";
import { writeContract } from "@wagmi/core";
import { campaignFactoryConfig } from "@/lib/contracts";
import { config } from "@/config";
import { useDeployedCampaigns } from "@/lib/hooks/useDeployedCampaigns";

const FormSchema = z.object({
  amountInWei: z.string()
    .min(1, "Amount is required")
    .regex(/^\d+$/, "Amount must be a positive integer in Wei"),
});

export default function Home() {
  const { isConnected } = useAppKitAccount();
  const { refetch } = useDeployedCampaigns();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amountInWei: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const promise = writeContract(config, {
      ...campaignFactoryConfig,
      functionName: 'createCampaign',
      args: [data.amountInWei],
    });

    toast.promise(promise,
      {
        loading: 'Waiting',
        success: () => {
          return 'Campaign Created';
        },
        error: 'Error',
      }
    );

    refetch();
  }

  let dashboard = (
    <>
      <h2>Open Campaigns</h2>
      <div className="flex justify-between gap-6 py-2">
        <div className="flex-3">
          <CampaignList />
        </div>

        <div className="flex-1">
          <div className="flex justify-end">
            <PopOutDialog
              triggerComponent={<AddButton variant="secondary" label="Create Campaign" />}
              title="Create Campaign"
              form={form}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="amountInWei"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Contribution</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 10000" {...field} />
                    </FormControl>
                    <FormDescription>Enter amount in Wei</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </PopOutDialog>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {isConnected ? dashboard : ''}
    </>
  );
}
