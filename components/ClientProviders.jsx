'use client'

import { WalletProvider } from '@/context/wallet-context'

export function ClientWalletProvider({ children }) {
  return <WalletProvider>{children}</WalletProvider>
}