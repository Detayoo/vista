"use client";

import { useState, useEffect } from "react";
import { getTransactions } from "@/lib/storage";

const FundingProgress = () => {
  const [raised, setRaised] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const goalAmount = 10;

  useEffect(() => {
    const calculateRaised = () => {
      const transactions = getTransactions();

      const total = transactions.reduce((sum, tx) => {
        return sum + parseFloat(tx.amount);
      }, 0);

      setRaised(total);
      setPercentage(Math.min((total / goalAmount) * 100, 100));
    };

    calculateRaised();

    const handleStorageChange = () => {
      calculateRaised();
    };

    window.addEventListener("storage-updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage-updated", handleStorageChange);
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <h3 className="text-sm font-medium">Funding Progress</h3>
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>{raised.toFixed(3)} ETH raised</span>
        <span>Goal: {goalAmount} ETH</span>
      </div>

      <div className="mt-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-full bg-gray-100 h-8 rounded-md overflow-hidden relative">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium"
              style={{ width: `${percentage}%`, minWidth: "40px" }}
            >
              {percentage > 5 ? `${percentage.toFixed(1)}%` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingProgress;
