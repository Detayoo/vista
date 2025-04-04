"use client";

import { formatDistanceToNow, format } from "date-fns";
import { Button } from "@/components/ui/button";

const TransactionDetail = ({ transaction, onClose }) => {
  const {
    id,
    from,
    to,
    amount,
    amountInWei,
    timestamp,
    status,
    blockNumber,
    blockHash,
  } = transaction;

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), "PPpp");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Transaction Details</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>

      <div className="bg-blue-50 p-3 rounded-md text-center">
        <p className="text-lg font-semibold text-blue-700">{amount} ETH</p>
        <p className="text-xs text-blue-600">≈ {amountInWei} Wei</p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-gray-500">Status</p>
          <div className="flex items-center">
            {status === "confirmed" ? (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <p className="text-sm font-medium text-green-500">Confirmed</p>
              </>
            ) : status === "pending" ? (
              <>
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <p className="text-sm font-medium text-yellow-500">Pending</p>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <p className="text-sm font-medium text-red-500">Failed</p>
              </>
            )}
          </div>
          {transaction.error && (
            <p className="text-xs text-red-500 mt-1">
              Error: {transaction.error}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500">Time</p>
          <p className="text-sm">
            {formatDate(timestamp)}
            <span className="text-xs text-gray-500 ml-2">
              ({formatDistanceToNow(new Date(timestamp), { addSuffix: true })})
            </span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500">Transaction Hash</p>
          <p className="text-sm font-medium break-all">{id}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500">From</p>
          <p className="text-sm font-medium break-all">{from}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500">To</p>
          <p className="text-sm font-medium break-all">{to}</p>
        </div>

        {blockNumber && (
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Block Number</p>
            <p className="text-sm">{blockNumber}</p>
          </div>
        )}

        {blockHash && (
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Block Hash</p>
            <p className="text-sm font-medium break-all">{blockHash}</p>
          </div>
        )}
      </div>

      <div className="pt-2">
        <a
          href={`https://sepolia.etherscan.io/tx/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
        >
          View on Etherscan
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TransactionDetail;
