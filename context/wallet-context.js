'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { setupWeb3 } from '@/lib/web3'

const WalletContext = createContext({
  provider: null,
  address: '',
  isConnected: false,
  isLoading: false,
  connect: async () => {},
  disconnect: () => {},
})

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null)
  const [address, setAddress] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Start with loading state

  // Function to clear wallet state
  const clearWalletState = () => {
    localStorage.removeItem('walletConnected')
    setProvider(null)
    setAddress('')
    setIsConnected(false)
  }

  // Check if wallet was previously connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Check if wallet is already connected (browser has ethereum object)
        if (window.ethereum && localStorage.getItem('walletConnected') === 'true') {
          // First check if we can get accounts without prompting
          try {
            const accounts = await window.ethereum.request({ 
              method: 'eth_accounts'  // This doesn't trigger the MetaMask popup
            })
            
            if (accounts && accounts.length > 0) {
              // User is still connected, restore connection
              const web3Provider = new ethers.BrowserProvider(window.ethereum)
              const network = await web3Provider.getNetwork()
              
              // Update state
              setProvider(web3Provider)
              setAddress(accounts[0])
              setIsConnected(true)
            } else {
              // User disconnected their wallet from our site in MetaMask
              clearWalletState()
            }
          } catch (error) {
            console.error('Error getting accounts silently:', error)
            // If this fails, fall back to the connect method
            try {
              // Set up web3 connection
              const { provider: web3Provider, address: userAddress } = await setupWeb3()
              
              // Update state
              setProvider(web3Provider)
              setAddress(userAddress)
              setIsConnected(true)
            } catch (err) {
              console.error('Could not reconnect wallet:', err)
              clearWalletState()
            }
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error)
        clearWalletState()
      } finally {
        setIsLoading(false)
      }
    }

    setIsLoading(true)
    checkConnection()
  }, [])

  // Update state when account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length === 0) {
          // User disconnected
          disconnect()
        } else if (accounts[0] !== address) {
          // Account changed
          setAddress(accounts[0])
        }
      }

      const handleChainChanged = () => {
        // Reload the page when chain changes
        window.location.reload()
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [address])

  const connect = async () => {
    try {
      setIsLoading(true)

      // Set up web3 connection
      const { provider: web3Provider, address: userAddress } = await setupWeb3()
      
      // Store connection state
      localStorage.setItem('walletConnected', 'true')
      
      // Update state
      setProvider(web3Provider)
      setAddress(userAddress)
      setIsConnected(true)
      setIsLoading(false)
    } catch (error) {
      console.error('Error connecting wallet:', error)
      setIsLoading(false)
      throw error
    }
  }

  const disconnect = () => {
    localStorage.removeItem('walletConnected')
    setProvider(null)
    setAddress('')
    setIsConnected(false)
  }

  return (
    <WalletContext.Provider
      value={{
        provider,
        address,
        isConnected,
        isLoading,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
