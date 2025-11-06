import type { TransactionListProps } from "../types/interfaces.ts";
import TransactionItem from "./TransactionItem";
import styles from "../styles/TransactionList.module.css";

export default function TransactionList({
  transactions,
  TransactionToEdit,
  onEditClick,
}: TransactionListProps) {
    
  return (
    <div className={`${styles.transactionList} ${TransactionToEdit ? styles.inEdit : ''}`}>
        <p>Double click transaction to edit it</p>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          TransactionToEdit={TransactionToEdit}
          onEditClick={onEditClick}
        />
      ))}
    </div>
  );
}
