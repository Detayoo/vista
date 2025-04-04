'use client'

import { useState } from 'react'
import { useWallet } from '@/context/wallet-context'
import { Card } from '@/components/ui/card'
import DonationForm from '@/components/donation-form'
import FundingProgress from '@/components/funding-progress'
import TransactionList from '@/components/transaction-list'
import TransactionDetail from '@/components/transaction-detail'

export default function Home() {
  const { isConnected } = useWallet()
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Support Our Cause</h2>
            <p className="text-gray-600 mb-4">
              Help us reach our goal by making a donation. Every contribution counts!
            </p>
            <FundingProgress />
            {isConnected ? (
              <DonationForm />
            ) : (
              <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                <p className="text-yellow-700">
                  Please connect your wallet to make a donation.
                </p>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Transactions</h2>
            <TransactionList 
              onSelectTransaction={tx => setSelectedTransaction(tx)} 
              selectedId={selectedTransaction?.id}
            />
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-6">
            {selectedTransaction ? (
              <TransactionDetail 
                transaction={selectedTransaction} 
                onClose={() => setSelectedTransaction(null)} 
              />
            ) : (
              <div className="text-center p-6">
                <h3 className="text-lg font-medium">Transaction Details</h3>
                <p className="text-gray-500 mt-2">
                  Select a transaction to view details
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
