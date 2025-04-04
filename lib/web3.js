import { ethers } from "ethers";

export const setupWeb3 = async () => {
  if (!window.ethereum) {
    throw new Error(
      "No Ethereum wallet detected. Please install MetaMask or another Web3 wallet."
    );
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("No Ethereum accounts found. Please unlock your wallet.");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();

    return {
      provider,
      address: accounts[0],
      chainId: network.chainId,
      networkName: network.name,
    };
  } catch (error) {
    console.error("Error setting up Web3:", error);

    if (error.code === 4001) {
      throw {
        code: "ACTION_REJECTED",
        message:
          "Connection request was rejected. Please approve the connection request in your wallet.",
      };
    }

    throw error;
  }
};

export const getEthBalance = async (provider, address) => {
  try {
    const balanceWei = await provider.getBalance(address);
    return ethers.formatEther(balanceWei);
  } catch (error) {
    console.error("Error getting ETH balance:", error);
    throw error;
  }
};

/**
 * Check if an address has sufficient funds for a transaction
 * @param {Object} provider Ethers provider
 * @param {string} address Ethereum address
 * @param {string} amountInWei Amount in wei
 * @returns {Object} Result with status and message
 */
export const checkSufficientFunds = async (provider, address, amountInWei) => {
  try {
    const balance = await provider.getBalance(address);

    // Need to account for gas costs as well (estimate ~0.001 ETH for gas)
    const gasEstimate = ethers.parseEther("0.001");

    // Make sure to handle string or BigNumber inputs properly
    let amountBigNum;
    try {
      // If amountInWei is already a BigNumber
      amountBigNum = ethers.getBigInt(amountInWei.toString());
    } catch (e) {
      // If conversion fails, try as string
      amountBigNum = ethers.getBigInt(amountInWei);
    }

    const totalRequired = amountBigNum + gasEstimate;

    if (balance < totalRequired) {
      return {
        hasSufficientFunds: false,
        message: `Insufficient funds. You have ${ethers.formatEther(
          balance
        )} ETH, but need approximately ${ethers.formatEther(
          totalRequired
        )} ETH (including gas fees).`,
      };
    }

    return {
      hasSufficientFunds: true,
    };
  } catch (error) {
    console.error("Error checking funds:", error);
    // Return true to avoid blocking transactions due to error in fund checking
    return {
      hasSufficientFunds: true,
      error: true,
    };
  }
};

/**
 * Validate Ethereum address
 * @param {string} address Ethereum address to validate
 * @returns {boolean} Is address valid
 */
export const isValidAddress = (address) => {
  try {
    return ethers.isAddress(address);
  } catch (error) {
    return false;
  }
};

/**
 * Map Ethereum error codes to user-friendly messages
 * @param {Error} error Error object from ethers
 * @returns {Object} Formatted error with code and message
 */
export const formatEthersError = (error) => {
  // Default error information
  let formattedError = {
    code: "TRANSACTION_ERROR",
    message: "Transaction failed. Please try again.",
  };

  // Check for common ethers error patterns
  if (error.code === "INSUFFICIENT_FUNDS") {
    formattedError = {
      code: "INSUFFICIENT_FUNDS",
      message:
        "Insufficient funds for this transaction. Please make sure you have enough ETH to cover both the amount and gas fees.",
    };
  } else if (error.code === "ACTION_REJECTED") {
    formattedError = {
      code: "ACTION_REJECTED",
      message:
        "Transaction rejected. Please approve the transaction in your wallet if you want to proceed.",
    };
  } else if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
    formattedError = {
      code: "UNPREDICTABLE_GAS_LIMIT",
      message:
        "Unable to estimate gas. The transaction may fail or the contract function may have an error.",
    };
  } else if (error.code === "NETWORK_ERROR") {
    formattedError = {
      code: "NETWORK_ERROR",
      message:
        "Network error. Please check your internet connection and try again.",
    };
  } else if (error.info && error.info.error && error.info.error.message) {
    // Extract message from nested error structure
    if (error.info.error.message.includes("insufficient funds")) {
      formattedError = {
        code: "INSUFFICIENT_FUNDS",
        message:
          "Insufficient funds for this transaction. Please make sure you have enough ETH to cover both the amount and gas fees.",
      };
    }
  }

  return formattedError;
};
