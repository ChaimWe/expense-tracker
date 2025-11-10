import AddTransactionForm from "./components/AddTransactionForm";
import { useMemo, useState } from "react";
import type { Transaction } from "./types/interfaces";
import useLocalStorageTransactions from "./hooks/useLocalStorageTransactions";
import TransactionList from "./components/TransactionLIst";
import TopBar from "./components/TopBar";

function App() {
  const { transactions, onAdd, onEdit } = useLocalStorageTransactions();
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);
  const [filterSelection, setFilterSelection] = useState<boolean | null>(null);
  const [sortingValue, setSortingValue] = useState<keyof Transaction | null>(
    null
  );
  const filteredAndSorted = useMemo(() => {
    let filteredTransactions: Transaction[] =
      filterSelection !== null
        ? transactions.filter((t) => t.expenseIncome === filterSelection)
        : transactions;

    if (sortingValue) {
      filteredTransactions = [...filteredTransactions].sort((a, b) => {
        const aValue = a[sortingValue];
        const bValue = b[sortingValue];
        if (aValue === null && bValue === null) return 0;
        if (aValue === null) return 1;
        if (bValue === null) return -1;

        if (typeof aValue === "number" && typeof bValue === "number")
          return aValue - bValue;
        if (typeof aValue === "string" && typeof bValue === "string")
          return aValue.localeCompare(bValue);
        if (typeof aValue === "boolean" && typeof bValue === "boolean")
          return (aValue ? 1 : 0) - (bValue ? 1 : 0);

        return 0;
      });
    }
    return filteredTransactions;
  }, [transactions, sortingValue, filterSelection]);

  const totalAmounts = useMemo(() => {
    let income = 0;
    let expense = 0;
    filteredAndSorted.forEach((t) => {
      t.expenseIncome ? (income += t.amount) : (expense += t.amount);
    });
    return { income, expense, balance: income - expense };
  }, [filteredAndSorted]);

  const onEditClick = (transaction: Transaction) =>
    setTransactionToEdit(transaction);

  return (
    <div>
      <AddTransactionForm
        onAddTransaction={onAdd}
        setTransactionToEdit={setTransactionToEdit}
        transactionToEdit={transactionToEdit}
        onEditTransaction={onEdit}
      />
      <TopBar
        totalAmounts={totalAmounts}
        setFilterSelection={setFilterSelection}
        setSortingValue={setSortingValue}
      />
      <hr />
      <TransactionList
        transactions={filteredAndSorted}
        TransactionToEdit={transactionToEdit}
        onEditClick={onEditClick}
      />
    </div>
  );
}

export default App;
