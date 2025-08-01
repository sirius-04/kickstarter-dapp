'use client'

import AddButton from "@/components/AddButton/AddButton";
import CampaignLayout from "@/components/CampaignLayout/CampaignLayout";
import PopOutDialog from "@/components/PopOutDialog/PopOutDialog";
import RequestsTable from "@/components/RequestsTable/RequestsTable";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getCampaignConfig } from "@/lib/contracts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { isAddressEqual, parseEther } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import z from "zod";

const FormSchema = z.object({
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  value: z.string().refine(
    (val) => {
      try {
        parseEther(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Enter a valid Ether amount" }
  ),
  recipient: z.string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Recipient must be a valid Ethereum address"),
});

export default function RequestsPage() {
  const params = useParams<{ campaignAddress: `0x${string}` }>();
  const address = params.campaignAddress;
  const campaignConfig = getCampaignConfig(address);

  const { writeContractAsync } = useWriteContract();
  
  const user = useAccount();
  const { data } = useReadContract({
    ...campaignConfig,
    functionName: 'manager'
  });
  const manager = data as `0x${string}` | undefined;
  const isManager = user.address && manager ? isAddressEqual(user.address, manager) : false;


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: '',
      value: '',
      recipient: '',
    }
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const promise = writeContractAsync({
      ...campaignConfig,
      functionName: 'createRequest',
      args: [data.description, parseEther(data.value), data.recipient],
    });

    toast.promise(promise,
      {
        loading: 'Waiting',
        success: () => {
          return 'Added!';
        },
        error: 'Error',
      }
    );
  }

  return (
    <CampaignLayout title={`Requests of Campaign ${address}`}>
      <div>
        <RequestsTable address={address} />
      </div>

      {isManager && (
        <div className="flex justify-center">
          <PopOutDialog
            triggerComponent={<AddButton variant="secondary" label='Add New Request'></AddButton>}
            onSubmit={form.handleSubmit(onSubmit)}
            title="Add New Request"
            form={form}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Describe your request'
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value (Ether)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 0.1" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Address</FormLabel>
                  <FormControl>
                    <Input placeholder={`e.g. ${address}`} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </PopOutDialog>
        </div>
      )}
    </CampaignLayout>
  );
}