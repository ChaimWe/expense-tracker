import { useState, useEffect, useRef } from "react";
import type { Transaction } from "../types/interfaces";
import type { useLocalStorageTransactionsResult } from "../types/interfaces";

export default function useLocalStorageTransactions(): useLocalStorageTransactionsResult {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch {
        console.error("Unable to load transactions");
      }
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  const onAdd = (transaction: Transaction): void =>
    setTransactions((prev) => [transaction, ...prev]);

  const onEdit = (id: number, newTransaction: Transaction): void =>
    setTransactions((prev) =>
      prev.map((transaction) => transaction.id === id ? newTransaction : transaction)
    );

  return { transactions, onAdd, onEdit };
}
