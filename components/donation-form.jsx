"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/wallet-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTransaction } from "@/lib/storage";
import {
  checkSufficientFunds,
  formatEthersError,
} from "@/lib/web3";

const DonationForm = () => {
  const { provider, address } = useWallet();
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  
  const RECIPIENT_ADDRESS = "0x715B1fd9bf6F3bA52155DD0eA1AfC254981455eb";

  const checkBalance = async (amountInEth) => {
    try {
      if (!provider || !address) return false;

      const amountInWei = ethers.parseEther(amountInEth).toString();

      const fundStatus = await checkSufficientFunds(
        provider,
        address,
        amountInWei
      );

      if (!fundStatus.hasSufficientFunds) {
        setError(fundStatus.message);
        return false;
      }

      return true;
    } catch (err) {
      setError("Error checking your balance. Please try again.");
      return false;
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setError("");
      setIsProcessing(true);

      const hasSufficientFunds = await checkBalance(amount);

      if (!hasSufficientFunds) {
        setIsProcessing(false);
        return;
      }

      const amountInWei = ethers.parseEther(amount);

      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: RECIPIENT_ADDRESS,
        value: amountInWei,
      });

      const pendingTransaction = {
        id: tx.hash,
        from: address,
        to: RECIPIENT_ADDRESS,
        amount: amount,
        amountInWei: amountInWei.toString(),
        timestamp: Date.now(),
        status: "pending",
      };

      addTransaction(pendingTransaction);

      const receipt = await tx.wait();

      const confirmedTransaction = {
        ...pendingTransaction,
        status: "confirmed",
        blockNumber: receipt.blockNumber,
        blockHash: receipt.blockHash,
      };

      addTransaction(confirmedTransaction);

      setAmount("");
      setIsProcessing(false);
    } catch (err) {

      const formattedError = formatEthersError(err);
      setError(formattedError.message);

      if (err.transaction && err.transaction.hash) {
        const failedTransaction = {
          id: err.transaction.hash,
          from: address,
          to: RECIPIENT_ADDRESS,
          amount: amount,
          amountInWei: ethers.parseEther(amount).toString(),
          timestamp: Date.now(),
          status: "failed",
          error: formattedError.message,
        };

        addTransaction(failedTransaction);
      }

      setIsProcessing(false);
    }
  };

  const handlePresetAmount = (preset) => {
    setAmount(preset);
  };

  return (
    <form onSubmit={handleDonate} className="mt-4 space-y-4">
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Donation Amount (ETH)
        </label>
        <Input
          id="amount"
          type="number"
          step="0.001"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handlePresetAmount("0.01")}
        >
          0.01 ETH
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handlePresetAmount("0.05")}
        >
          0.05 ETH
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handlePresetAmount("0.1")}
        >
          0.1 ETH
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handlePresetAmount("0.5")}
        >
          0.5 ETH
        </Button>
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          "Donate Now"
        )}
      </Button>
    </form>
  );
};

export default DonationForm;
