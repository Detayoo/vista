// Local storage key for transactions
const TRANSACTIONS_STORAGE_KEY = "vista_transactions";

/**
 * Get all transactions from localStorage
 * @returns {Array} Array of transaction objects
 */
export const getTransactions = () => {
  try {
    const transactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    return transactions ? JSON.parse(transactions) : [];
  } catch (error) {
    console.error("Error retrieving transactions from localStorage:", error);
    return [];
  }
};

/**
 * Add a new transaction to localStorage
 * @param {Object} transaction Transaction object to add
 */
export const addTransaction = (transaction) => {
  try {
    const transactions = getTransactions();

    // Check if transaction already exists (by ID)
    const exists = transactions.some((tx) => tx.id === transaction.id);

    if (!exists) {
      // Add new transaction
      transactions.push(transaction);

      // Store updated transactions
      localStorage.setItem(
        TRANSACTIONS_STORAGE_KEY,
        JSON.stringify(transactions)
      );

      // Dispatch custom event to notify components
      window.dispatchEvent(new Event("storage-updated"));
    }
  } catch (error) {
    console.error("Error adding transaction to localStorage:", error);
  }
};

/**
 * Update an existing transaction in localStorage
 * @param {Object} transaction Updated transaction object
 */
export const updateTransaction = (transaction) => {
  try {
    const transactions = getTransactions();

    // Find transaction index
    const index = transactions.findIndex((tx) => tx.id === transaction.id);

    if (index !== -1) {
      // Update transaction
      transactions[index] = { ...transactions[index], ...transaction };

      // Store updated transactions
      localStorage.setItem(
        TRANSACTIONS_STORAGE_KEY,
        JSON.stringify(transactions)
      );

      // Dispatch custom event to notify components
      window.dispatchEvent(new Event("storage-updated"));
    }
  } catch (error) {
    console.error("Error updating transaction in localStorage:", error);
  }
};

/**
 * Clear all transactions from localStorage
 */
export const clearTransactions = () => {
  try {
    localStorage.removeItem(TRANSACTIONS_STORAGE_KEY);

    // Dispatch custom event to notify components
    window.dispatchEvent(new Event("storage-updated"));
  } catch (error) {
    console.error("Error clearing transactions from localStorage:", error);
  }
};
