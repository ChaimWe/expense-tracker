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

  const filteredTransactions =
    filterSelection !== null
      ? transactions.filter((t) => t.expenseIncome === filterSelection)
      : transactions;
  const [sortingValue, setSortingValue] = useState<keyof Transaction | null>(
    null
  );
  const filteredAndSorted = useMemo(() => {
    let result = filteredTransactions;

    if (sortingValue) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortingValue];
        const bVal = b[sortingValue];
        if (aVal === null && bVal === null) return 0;
        if (aVal === null) return 1;
        if (bVal === null) return -1;

        if (typeof aVal === "number" && typeof bVal === "number")
          return aVal - bVal;
        if (typeof aVal === "string" && typeof bVal === "string")
          return aVal.localeCompare(bVal);
        if (typeof aVal === "boolean" && typeof bVal === "boolean")
          return (aVal ? 1 : 0) - (bVal ? 1 : 0);

        return 0;
      });
    }
    return result;
  }, [filteredTransactions, sortingValue]);

  const totalAmounts = useMemo(()=>{
    let income = 0; 
    let expense = 0;
    filteredTransactions.forEach(t =>{
      t.expenseIncome? income += t.amount: expense += t.amount
    })
    return {income, expense, balance: income - expense}
  }, [filteredTransactions]);

  const onEditClick = (transaction: Transaction) =>
    setTransactionToEdit(transaction);

  return (
    <div>
      <AddTransactionForm
        onAddTransaction={onAdd}
        setTransactionToEdit={setTransactionToEdit}
        TransactionToEdit={transactionToEdit}
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
