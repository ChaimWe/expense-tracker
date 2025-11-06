import type { TopBarProps } from "../types/interfaces";
import styles from "../styles/TopBar.module.css";

export default function TopBar({
  setFilterSelection,
  setSortingValue,
  totalAmounts,
}: TopBarProps) {
  const parseFilterValue = (e: string) => {
    if (e === "expense") return setFilterSelection(false);
    if (e === "income") return setFilterSelection(true);
    return setFilterSelection(null);
  };
  const parseSortingValue = (e: string) => {
    if (e === "sort") return setSortingValue(null);
    if (e === "name") return setSortingValue("name");
    if (e === "amount") return setSortingValue("amount");
    if (e === "id") return setSortingValue("id");
    if (e === "expenseIncome") return setSortingValue("expenseIncome");
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.filterSort}>
        <select
          name="filter"
          onChange={(e) => parseFilterValue(e.target.value)}
        >
          <option value="">Filter</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select name="sort" onChange={(e) => parseSortingValue(e.target.value)}>
          <option value="sort">Sort by</option>
          <option value="name">Name</option>
          <option value="amount">Amount</option>
          <option value="id">Date</option>
          <option value="expenseIncome">Type</option>
        </select>
      </div>
      <div className={styles.balance}>
        <label htmlFor="income" className={styles.label}>
          Total Income:{" "}
        </label>
        <input type="text" name="income" value={totalAmounts.income} disabled />
        <label htmlFor="expense" className={styles.label}>
          Total Expense:{" "}
        </label>
        <input
          type="text"
          name="expense"
          value={totalAmounts.expense}
          disabled
        />
        <label htmlFor="balance" className={styles.label}>
          Balance:{" "}
        </label>
        <input
          type="text"
          name="balance"
          value={totalAmounts.balance}
          disabled
        />
      </div>
    </div>
  );
}
