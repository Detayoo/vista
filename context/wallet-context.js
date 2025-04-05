'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
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
  const [isLoading, setIsLoading] = useState(true) 

  const clearWalletState = () => {
    localStorage.removeItem('walletConnected')
    setProvider(null)
    setAddress('')
    setIsConnected(false)
  }

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (window.ethereum && localStorage.getItem('walletConnected') === 'true') {
          try {
            const accounts = await window.ethereum.request({ 
              method: 'eth_accounts' 
            })
            
            if (accounts && accounts.length > 0) {
              const web3Provider = new ethers.BrowserProvider(window.ethereum)
              const network = await web3Provider.getNetwork()
              
              setProvider(web3Provider)
              setAddress(accounts[0])
              setIsConnected(true)
            } else {
              clearWalletState()
            }
          } catch (error) {
            console.error('Error getting accounts silently:', error)
            try {
              const { provider: web3Provider, address: userAddress } = await setupWeb3()
              
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

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length === 0) {
          disconnect()
        } else if (accounts[0] !== address) {
          setAddress(accounts[0])
        }
      }

      const handleChainChanged = () => {
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

      const { provider: web3Provider, address: userAddress } = await setupWeb3()
      
      localStorage.setItem('walletConnected', 'true')
      
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

  const values = useMemo(() => ({
    provider,
    address,
    isConnected,
    isLoading,
    connect,
    disconnect,
  }), [provider, address, isConnected, isLoading, connect, disconnect])

  return (
    <WalletContext.Provider
      value={values}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)

