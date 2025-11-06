import type { TransactionItemProps } from "../types/interfaces";
import styles from "../styles/TransactionItem.module.css";

export default function TransactionItem({
  transaction,
  TransactionToEdit,
  onEditClick,
}: TransactionItemProps) {
  const date = new Date(transaction.id).toLocaleString();

  return (
    <div
      className={`${
        transaction.expenseIncome ? styles.income : styles.expense
      } ${TransactionToEdit?.id===transaction.id ? styles.inEdit : ''}`}
      onDoubleClick={() => onEditClick(transaction)}
    >
      <span className="name">{transaction.name}</span>
      <span className="details">{transaction.details}</span>
      <span className="amount">{transaction.amount}</span>
      <span className="date">{date}</span>
    </div>
  );
}
