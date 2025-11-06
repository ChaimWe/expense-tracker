import type { AddTransactionFormProps } from "../types/interfaces";
import { useState, useEffect } from "react";
import styles from "../styles/AddTransactionForm.module.css";

export default function AddTransactionForm({
  onAddTransaction,
  TransactionToEdit,
  setTransactionToEdit,
  onEditTransaction,
}: AddTransactionFormProps) {
  const [name, setName] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [amount, setAmount] = useState<string>('');
  const [expenseIncome, setExpenseIncome] = useState<boolean | null>(null);
  useEffect(() => {
    if (TransactionToEdit) {
      setName(TransactionToEdit.name);
      setDetails(TransactionToEdit.details);
      setAmount(TransactionToEdit.amount.toString());
      setExpenseIncome(TransactionToEdit.expenseIncome);
    }
  }, [TransactionToEdit]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    if (TransactionToEdit) {
      const validAmount = parseFloat(amount)|0;
      const id = TransactionToEdit.id;
      onEditTransaction(TransactionToEdit?.id, {
        id,
        name,
        details,
        amount: validAmount,
        expenseIncome,
      });
      setName("");
      setDetails("");
      setAmount('');
      setExpenseIncome(null);
      setTransactionToEdit(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expenseIncome === null) {
      alert("Please enter a transaction type.");
      return;
    }
    if (!amount || amount === '0') {
      alert("Please Enter a valid amount");
      return;
    }
    const validAmount = parseFloat(amount);
    onAddTransaction({ id: Date.now(), name, details, amount: validAmount, expenseIncome });
    setName("");
    setDetails("");
    setAmount('');
    setExpenseIncome(null);
  };

  return (
    <form
      className={styles.form}
      onSubmit={TransactionToEdit ? handleEdit : handleSubmit}
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name..."
      />
      <input
        type="text"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Details..."
      />
      <input
        type="text"
        inputMode="numeric"
        pattern="\d+(\.?\d*)?|\.?d+"
        value={amount}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
          }
        }}
        placeholder="Amount..."
      />
      <select
        name="expenseIncome"
        value={expenseIncome === null ? "" : expenseIncome.toString()}
        onChange={(e) => setExpenseIncome(e.target.value === "true")}
        required
      >
        <option value="" disabled>
          Select Type
        </option>
        <option value="true">Income</option>
        <option value="false">Expense</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
