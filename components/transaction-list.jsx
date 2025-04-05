"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useWallet } from "@/context/wallet-context";
import { getTransactions } from "@/lib/storage";

const TransactionList = ({ onSelectTransaction, selectedId }) => {
  const { address } = useWallet();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = () => {
      const txs = getTransactions();

      const filteredTxs = txs.filter(
        (tx) => tx.from.toLowerCase() === address.toLowerCase()
      );

      filteredTxs.sort((a, b) => b.timestamp - a.timestamp);

      setTransactions(filteredTxs);
    };

    loadTransactions();

    const handleStorageUpdate = () => {
      const txs = getTransactions();

      const filteredTxs = txs.filter(
        (tx) => tx.from.toLowerCase() === address.toLowerCase()
      );

      filteredTxs.sort((a, b) => b.timestamp - a.timestamp);
      setTransactions(filteredTxs);
    };

    window.addEventListener("storage-updated", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage-updated", handleStorageUpdate);
    };
  }, [address]);

  if (transactions.length === 0) {
    return (
      <div className="py-6 text-center border-2 border-dashed border-gray-200 rounded-lg">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No transactions
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Your donation history will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 -mx-6">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors mx-2 rounded-md hover:border-l-4 hover:border-blue-500 hover:bg-blue-50 }`}
          onClick={() => onSelectTransaction(tx)}
        >
          <div className="flex justify-between">
            <div className="truncate">
              <p className="text-sm font-medium text-gray-900 truncate">
                {tx.amount} ETH Donation
              </p>
              <p className="text-xs text-gray-500 mt-1 truncate">
                TX: {tx.id.substring(0, 8)}...
                {tx.id.substring(tx.id.length - 6)}
              </p>
            </div>
            <div className="text-right">
              {tx.status === "confirmed" ? (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Confirmed
                </div>
              ) : tx.status === "pending" ? (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending
                </div>
              ) : (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Failed
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(tx.timestamp), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
