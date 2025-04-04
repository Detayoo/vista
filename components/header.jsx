"use client";

import React from "react";
import { useWallet } from "@/context/wallet-context";
import WalletConnect from "@/components/wallet-connect";

const Header = () => {
  const { address, isConnected } = useWallet();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold tracking-tighter lowercase bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text logo">
            vista
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {isConnected && (
            <div className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">
                {address.substring(0, 6)}...
                {address.substring(address.length - 4)}
              </span>
            </div>
          )}

          <WalletConnect />
        </div>
      </div>
    </header>
  );
};

export default Header;
