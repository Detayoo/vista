const TRANSACTIONS_STORAGE_KEY = "vista_transactions";

export const getTransactions = () => {
  try {
    const transactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    return transactions ? JSON.parse(transactions) : [];
  } catch (error) {
    console.error("Error retrieving transactions from localStorage:", error);
    return [];
  }
};

export const addTransaction = (transaction) => {
  try {
    const transactions = getTransactions();

    const existingIndex = transactions?.findIndex(
      (tx) => tx.id === transaction.id
    );

    if (existingIndex !== -1) {
      transactions[existingIndex] = {
        ...transactions[existingIndex],
        ...transaction,
      };
    } else {
      transactions.push(transaction);
    }

    localStorage.setItem(
      TRANSACTIONS_STORAGE_KEY,
      JSON.stringify(transactions)
    );

    window.dispatchEvent(new Event("storage-updated"));
  } catch (error) {
  }
};

export const updateTransaction = (transaction) => {
  try {
    const transactions = getTransactions();

    const index = transactions.findIndex((tx) => tx.id === transaction.id);

    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...transaction };

      localStorage.setItem(
        TRANSACTIONS_STORAGE_KEY,
        JSON.stringify(transactions)
      );

      window.dispatchEvent(new Event("storage-updated"));
    }
  } catch (error) {
    console.error("Error updating transaction in localStorage:", error);
  }
};

export const clearTransactions = () => {
  try {
    localStorage.removeItem(TRANSACTIONS_STORAGE_KEY);

    window.dispatchEvent(new Event("storage-updated"));
  } catch (error) {
    console.error("Error clearing transactions from localStorage:", error);
  }
};
