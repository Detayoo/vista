import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getProvider, 
  connectWallet as connect, 
  checkWalletConnection,
  addWalletListener
} from '../lib/web3';

// Create context
const WalletContext = createContext();

// Provider component
export const WalletProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize wallet connection
  useEffect(() => {
    const initWallet = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const connection = await checkWalletConnection();
        
        if (connection.connected) {
          setConnected(true);
          setProvider(connection.provider);
          setSigner(connection.signer);
          setAddress(connection.address);
          setNetwork(connection.network);
        }
      } catch (err) {
        console.error('Failed to initialize wallet:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initWallet();
  }, []);

  // Add wallet listeners
  useEffect(() => {
    const handleAccountChange = (connection) => {
      if (connection.connected) {
        setConnected(true);
        setProvider(connection.provider);
        setSigner(connection.signer);
        setAddress(connection.address);
        setNetwork(connection.network);
      } else {
        setConnected(false);
        setProvider(null);
        setSigner(null);
        setAddress(null);
        setNetwork(null);
      }
    };

    addWalletListener(handleAccountChange);
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const connection = await connect();
      
      setConnected(true);
      setProvider(connection.provider);
      setSigner(connection.signer);
      setAddress(connection.address);
      setNetwork(connection.network);
      
      return connection;
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setConnected(false);
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setNetwork(null);
  };

  const value = {
    connected,
    provider,
    signer,
    address,
    network,
    loading,
    error,
    connectWallet,
    disconnectWallet
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

// Hook for using the wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
