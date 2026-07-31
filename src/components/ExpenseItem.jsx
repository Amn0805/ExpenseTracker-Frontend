import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { updateExpense } from '../api/expenseApi';
import { categoryConfig } from '../utils/categoryConfig';

// "onUpdated" tells App.jsx to refresh the list after a successful inline edit
function ExpenseItem({ expense, onDelete, onUpdated }) {
    // Controls whether this card is showing normal view or edit inputs
  const [isEditing, setIsEditing] = useState(false);
  // Temporary values used only while editing — the real expense doesn't change until "Save"
  const [editTitle, setEditTitle] = useState(expense.title);
  const [editAmount, setEditAmount] = useState(expense.amount);

  // Look up this expense's category config once — gives us its icon, colors, etc.
  const config = categoryConfig[expense.category] || categoryConfig.other;
  const CategoryIcon = config.icon; // component reference — rendered below as <CategoryIcon />

   // Turns "2500" into "PKR 2,500" — toLocaleString adds the comma automatically
  const formattedAmount = `PKR ${expense.amount.toLocaleString()}`;

 // Turns "2024-06-10" into "June 10, 2024" (a friendlier date format)
  const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleDeleteClick = () => {
     // Ask for confirmation before actually deleting — prevents accidental clicks
    if (window.confirm(`Delete "${expense.title}"?`)) {
      onDelete(expense.id);
    }
  };
 // Called when user clicks on the title or amount — enters edit mode
  const startEditing = () => {
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
    setIsEditing(true);
  };
 // Called when user clicks "Save" — sends update to backend, then refreshes the list
  const handleSave = async () => {
    if (!editTitle.trim() || !editAmount) return; // don't save empty/invalid values
    await updateExpense(expense.id, { title: editTitle, amount: Number(editAmount) });
    setIsEditing(false);
    onUpdated();  // tell App.jsx to fetch fresh data
  };

  // Called when user clicks "Cancel" — discards changes, exits edit mode
  const handleCancel = () => setIsEditing(false);

  return (
    // flex-col on mobile (stacks nicely), row on sm+ screens (side by side)
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-colors">

      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Category icon circle — color/icon come from categoryConfig */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.iconBg}`}>
          <CategoryIcon size={18} className={config.iconColor} />
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-2 py-1 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button onClick={handleSave} className="text-teal-600 dark:text-teal-400 text-sm font-medium">
                Save
              </button>
              <button onClick={handleCancel} className="text-slate-400 text-sm">
                Cancel
              </button>
            </div>
          ) : (
            <p
              className="font-medium text-slate-800 dark:text-white truncate cursor-pointer"
              onClick={startEditing}
              title="Click to edit"
            >
              {expense.title}
            </p>
          )}

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {config.label} · {formattedDate}
          </p>

          {expense.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              {expense.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
        {!isEditing && (
          <span
            className={`font-semibold cursor-pointer ${config.amountColor}`}
            onClick={startEditing}
            title="Click to edit"
          >
            {formattedAmount}
          </span>
        )}
        <button
          onClick={handleDeleteClick}
          className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 flex items-center justify-center transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;

