import type { TopBarProps, Transaction } from "../types/interfaces";
import styles from "../styles/TopBar.module.css";

export default function TopBar({
  setFilterSelection,
  setSortingValue,
  totalAmounts,
}: TopBarProps) {
  const parseFilterValue = (e: string) => {
    switch (e) {
      case "expense":
        setFilterSelection(false);
        break;
      case "income":
        setFilterSelection(true);
        break;
      default:
        setFilterSelection(null);
    }
  };
  const parseSortingValue = (e: string) => {
    switch (e) {
      case "sort":
        setSortingValue(null);
        break;
      case "name":
        setSortingValue("name");
        break;
      case "amount":
        setSortingValue("amount");
        break;
      case "id":
        setSortingValue("id");
        break;
      case "expenseIncome":
        setSortingValue("expenseIncome");
        break;
    }
  };
  const sortOptions: {label: string, value: keyof Transaction}[] = [
    {label:"Name", value: 'name'},
    {label:"Amount", value: 'amount'},
    {label: 'Date', value:"id"},
    {label:'type',value:"expenseIncome"},
  ];

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
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
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
