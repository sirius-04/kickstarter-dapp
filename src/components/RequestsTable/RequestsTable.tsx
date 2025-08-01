'use cient'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCampaignConfig } from "@/lib/contracts";
import { isAddressEqual } from "viem";
import { useAccount, useReadContract, useReadContracts, useWriteContract } from "wagmi";
import { Button } from "../ui/button";
import { toast } from "sonner";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

export default function RequestsTable({ address }: { address: `0x${string}` }) {
  const campaignConfig = getCampaignConfig(address);
  type RequestTuple = [string, bigint, string, boolean, bigint, bigint];
  const { writeContractAsync } = useWriteContract();

  const user = useAccount();
  const { data } = useReadContract({
    ...campaignConfig,
    functionName: 'manager'
  });
  const manager = data as `0x${string}` | undefined;
  const isManager = user.address && manager ? isAddressEqual(user.address, manager) : false;

  const { data: requestCount } = useReadContract({
    ...campaignConfig,
    functionName: 'getRequestsCount',
  });

  const requestCalls = [
    ...Array.from({ length: Number(requestCount ?? 0) }, (_, i) => ({
      ...campaignConfig,
      functionName: 'requests',
      args: [BigInt(i)],
    })),
  ];

  const { data: requests } = useReadContracts({
    contracts: requestCalls,
  });

  const total = requests?.reduce((sum, request) => {
    if (request.status === 'success' && request.result) {
      const result = request.result as RequestTuple;
      return sum + (result[1] || BigInt(0));
    }
    return sum;
  }, BigInt(0)) || BigInt(0);

  const { data: approversCount } = useReadContract({
    ...campaignConfig,
    functionName: 'approversCount'
  });

  function finalizeRequest(index: bigint) {
    return writeContractAsync({
      ...campaignConfig,
      functionName: 'finalizeRequest',
      args: [index],
    });
  }

  function approveRequest(index: bigint) {
    return writeContractAsync({
      ...campaignConfig,
      functionName: 'approveRequest',
      args: [index],
    });
  }

  async function handleClick(index: bigint) {
    if (isManager) {
      const promise = finalizeRequest(index);

      toast.promise(promise, {
        loading: 'Finalizing request...',
        success: 'Request finalized successfully!',
        error: 'Failed to finalize request',
      });
    } else {
      const promise = approveRequest(index);

      toast.promise(promise, {
        loading: 'Approving request...',
        success: 'Request approved successfully!',
        error: 'Failed to approve request',
      });
    }
  }

  return (
    <Table>
      <TableCaption>Found {requests?.length} requests</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount (Wei)</TableHead>
          <TableHead>Recipient</TableHead>
          <TableHead>Approval Count</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {requests?.map((request, index) => {
          if (request.status === 'success' && request.result) {
            const result = request.result as RequestTuple;
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{result[0]}</TableCell>
                <TableCell>{result[1]?.toString()}</TableCell>
                <TableCell>{result[2]}</TableCell>
                <TableCell>{result[4]?.toString()}/{approversCount?.toString()}</TableCell>
                <TableCell>
                  {
                    result[3] ? (
                      <span className="text-green-600">Completed</span>
                    ) : (
                      <ConfirmationDialog
                          triggerComponent={
                            <Button>
                              {isManager ? 'Finalize' : 'Approve'}
                            </Button>
                          }
                          handleConfirm={() => handleClick(BigInt(index))}
                      />
                    )
                  }
                </TableCell>
              </TableRow>
            );
          }
          return null;
        })}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{total.toString()} Wei</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}