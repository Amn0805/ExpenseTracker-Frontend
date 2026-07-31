import ExpenseItem from './ExpenseItem';
// Passes "onUpdated" down to every ExpenseItem so inline edits can trigger a refresh in App.jsx
function ExpenseList({ expenses, onDelete, onUpdated }) {
   // If there are no expenses, show a friendly empty state instead of a blank screen
  if (expenses.length === 0) {
    return (
      <div className="text-center text-slate-400 dark:text-slate-500 py-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl transition-colors">
        No expenses found.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        // "key" is required by React whenever you render a list — helps it track each item
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          onUpdated={onUpdated}
        />
      ))}
    </div>
  );
}

export default ExpenseList;