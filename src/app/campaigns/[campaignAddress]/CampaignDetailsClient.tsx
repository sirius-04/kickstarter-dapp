'use client'

import AddButton from '@/components/AddButton/AddButton';
import CampaignDetailCards from '@/components/CampaignDetailCards/CampaignDetailCards';
import PopOutDialog from '@/components/PopOutDialog/PopOutDialog';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useWriteContract, useReadContract } from "wagmi";
import { getCampaignConfig } from "@/lib/contracts";
import { CardGrid } from '@/components/CardGrid/CardGrid';
import CampaignLayout from '@/components/CampaignLayout/CampaignLayout';

const FormSchema = z.object({
  amountInWei: z.string()
    .min(1, "Amount is required")
    .regex(/^\d+$/, "Amount must be a positive integer in Wei"),
});

export default function CampaignDetailsClient({ address }: { address: `0x${string}` }) {
  const campaignConfig = getCampaignConfig(address);

  const { writeContractAsync } = useWriteContract();
  const { data } = useReadContract({
    ...campaignConfig,
    functionName: 'minimumContribution'
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amountInWei: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const promise = writeContractAsync({
      ...campaignConfig,
      functionName: 'contribute',
      value: BigInt(data.amountInWei),
    });

    toast.promise(promise,
      {
        loading: 'Waiting',
        success: () => {
          return 'Contributed!';
        },
        error: 'Error',
      }
    );
  }

  return (
    <CampaignLayout title={`Campaign ${address}`}>
      <div>
        <CardGrid>
          <CampaignDetailCards address={address} />
        </CardGrid>
      </div>

      <div className='flex justify-center'>
        <PopOutDialog
          triggerComponent={<AddButton variant="secondary" label="Contribute" />}
          title="Contribute to Campaign"
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="amountInWei"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum contribution to be approvers: {data ? data.toString() : ''} Wei</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 10000" {...field} />
                </FormControl>
                <FormDescription>Enter amount in Wei</FormDescription>
              </FormItem>
            )}
          />
        </PopOutDialog>
      </div>
    </CampaignLayout >
  )
}