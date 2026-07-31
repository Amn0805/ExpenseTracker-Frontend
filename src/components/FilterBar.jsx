// Lets the user filter the expense list by category, search text, and amount range.
// "filters" and "onFilterChange" both come from App.jsx (this component doesn't hold its own state).
import { Search, Download } from 'lucide-react';
import { exportExpensesCSV } from '../api/expenseApi';

function FilterBar({ filters, onFilterChange }) {
  const inputClass =
    "border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors";

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 flex flex-wrap gap-2 transition-colors">
      {/* Search input with icon inside it */}
      <div className="relative flex-1 min-w-[150px]">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by title..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className={`${inputClass} w-full pl-9`}
        />
      </div>

      <select
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
        className={inputClass}
      >
        <option value="">All Categories</option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="shopping">Shopping</option>
        <option value="utilities">Utilities</option>
        <option value="health">Health</option>
        <option value="other">Other</option>
      </select>

      <input
        type="number"
        placeholder="Min amount"
        value={filters.minAmount}
        onChange={(e) => onFilterChange('minAmount', e.target.value)}
        className={`${inputClass} w-28`}
      />

      <input
        type="number"
        placeholder="Max amount"
        value={filters.maxAmount}
        onChange={(e) => onFilterChange('maxAmount', e.target.value)}
        className={`${inputClass} w-28`}
      />

      <button
        onClick={exportExpensesCSV}
        className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors"
      >
        <Download size={14} />
        Export CSV
      </button>
    </div>
  );
}

export default FilterBar;

