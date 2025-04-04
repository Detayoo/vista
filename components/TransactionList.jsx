import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TransactionList = ({ transactions }) => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState('newest');
  
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortOrder === 'newest') {
      return b.timestamp - a.timestamp;
    } else {
      return a.timestamp - b.timestamp;
    }
  });

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  const viewTransactionDetails = (id) => {
    router.push(`/transaction/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <button 
          onClick={toggleSortOrder}
          className="text-blue-600 text-sm flex items-center"
        >
          <span>Sort: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {sortOrder === 'newest' ? (
              <path d="M6 9l6 6 6-6" />
            ) : (
              <path d="M18 15l-6-6-6 6" />
            )}
          </svg>
        </button>
      </div>

      {sortedTransactions.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400 mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
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
          <p className="text-gray-500">No transactions yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Donations will appear here
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sortedTransactions.map((tx) => (
            <li
              key={tx.id}
              onClick={() => viewTransactionDetails(tx.id)}
              className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">
                    {tx.amount} ETH
                  </p>
                  <p className="text-xs text-gray-500">
                    From: {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(tx.timestamp)}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tx.status === 'Confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {tx.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {sortedTransactions.length > 0 && (
        <div className="mt-4 text-center">
          <Link href="/">
            <span className="text-sm text-blue-600 hover:text-blue-800">
              View all transactions
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
