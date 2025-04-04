import { useWallet } from '../context/WalletContext';
import { Button } from './ui/Button';

const WalletConnect = () => {
  const { connected, connectWallet, disconnectWallet, address } = useWallet();

  return (
    <div>
      {connected ? (
        <Button
          onClick={disconnectWallet}
          variant="outline"
          className="flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Disconnect
        </Button>
      ) : (
        <Button
          onClick={connectWallet}
          className="flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M12 8v1"></path>
            <path d="M12 15v1"></path>
            <path d="M16 12h1"></path>
            <path d="M7 12h1"></path>
          </svg>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
