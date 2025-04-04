'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@/context/wallet-context'
import { Button } from '@/components/ui/button'

// Define common button styling to maintain consistent width
const buttonBaseClass = "min-w-[160px] flex items-center justify-center"

const WalletConnect = () => {
  const { connect, disconnect, isConnected, address, isLoading } = useWallet()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  
  // Set a brief timeout to ensure UI consistent loading appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  
  // Show loading state during initial component mount or explicit loading
  if (initialLoading || isLoading) {
    return (
      <Button 
        variant="outline" 
        disabled
        className={buttonBaseClass}
      >
        <svg className="animate-spin mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading...
      </Button>
    )
  }
  
  if (isConnected) {
    return (
      <div className="relative">
        <Button 
          variant="outline" 
          onClick={toggleDropdown}
          className={`${buttonBaseClass} justify-between`}
        >
          <span className="hidden md:inline truncate max-w-[100px]">
            {address.substring(0, 6)}...{address.substring(address.length - 4)}
          </span>
          <span className="md:hidden">Wallet</span>
          <svg className="ml-1 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
            <button
              onClick={() => {
                disconnect()
                setIsDropdownOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <Button 
      onClick={connect}
      className={buttonBaseClass}
    >
      <svg className="mr-2 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
      Connect Wallet
    </Button>
  )
}

export default WalletConnect
