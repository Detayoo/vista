import { useState } from 'react';
import Link from 'next/link';
import WalletConnect from './WalletConnect';
import { useWallet } from '../context/WalletContext';

const Navbar = () => {
  const { connected, address } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="flex items-center">
                <span className="text-2xl font-bold tracking-tighter lowercase bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text font-space-grotesk">vista</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            <Link href="/">
              <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100">
                Dashboard
              </span>
            </Link>
            {connected && (
              <div className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                </span>
              </div>
            )}
            <div className="ml-4">
              <WalletConnect />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100">
                Dashboard
              </span>
            </Link>
            {connected && (
              <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                </span>
              </div>
            )}
            <div className="px-3 py-2">
              <WalletConnect />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
