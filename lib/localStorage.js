// Save transaction to localStorage
export const saveTxToLocalStorage = (transaction, callback) => {
  try {
    // Get existing transactions
    const existingTxs = JSON.parse(localStorage.getItem("transactions")) || [];

    // Add new transaction
    const updatedTxs = [transaction, ...existingTxs];

    // Save back to localStorage
    localStorage.setItem("transactions", JSON.stringify(updatedTxs));

    // Execute callback if provided
    if (callback && typeof callback === "function") {
      callback(updatedTxs);
    }

    return updatedTxs;
  } catch (error) {
    console.error("Error saving transaction to localStorage:", error);
    return [];
  }
};

// Get all transactions from localStorage
export const getTransactionsFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  } catch (error) {
    console.error("Error getting transactions from localStorage:", error);
    return [];
  }
};

// Get a single transaction by ID
export const getTransactionById = (id) => {
  try {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    return transactions.find((tx) => tx.id === id) || null;
  } catch (error) {
    console.error("Error getting transaction by ID:", error);
    return null;
  }
};

// Update a transaction in localStorage
export const updateTransaction = (id, updatedData, callback) => {
  try {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const updatedTxs = transactions.map((tx) =>
      tx.id === id ? { ...tx, ...updatedData } : tx
    );

    localStorage.setItem("transactions", JSON.stringify(updatedTxs));

    if (callback && typeof callback === "function") {
      callback(updatedTxs);
    }

    return updatedTxs;
  } catch (error) {
    console.error("Error updating transaction:", error);
    return [];
  }
};

// Clear all transactions from localStorage
export const clearTransactions = (callback) => {
  try {
    localStorage.removeItem("transactions");

    if (callback && typeof callback === "function") {
      callback([]);
    }

    return true;
  } catch (error) {
    console.error("Error clearing transactions:", error);
    return false;
  }
};
