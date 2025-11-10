export type Transaction={
    id: number;
    name: string;
    details: string;
    amount: number;
    expenseIncome: boolean | null;
}
export interface useLocalStorageTransactionsResult{
    transactions: Transaction[];
    onAdd: (transaction: Transaction) => void;
    onEdit: ( newTransaction: Transaction ) => void;
}
export interface AddTransactionFormProps{
    onAddTransaction: (transaction: Transaction) => void;
    transactionToEdit: Transaction | null;
    setTransactionToEdit: React.Dispatch<React.SetStateAction<Transaction | null>>;
    onEditTransaction: (updatedTransaction: Transaction) => void;
}
export interface TransactionItemProps{
    TransactionToEdit: Transaction | null;
    transaction: Transaction;
    onEditClick: (transaction: Transaction) => void;
}
export interface TransactionListProps{
    TransactionToEdit: Transaction | null;
    transactions: Transaction[];
    onEditClick: (transaction: Transaction) => void;
}
export interface TopBarProps{
    setFilterSelection: React.Dispatch<React.SetStateAction<boolean | null>>;
    setSortingValue: React.Dispatch<React.SetStateAction<keyof Transaction | null>>;
    totalAmounts: {income: number, expense: number, balance: number};
}