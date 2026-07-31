import { Wallet, Moon, Sun } from 'lucide-react';

function Sidebar({ totalAmount, totalExpenses, darkMode, onToggleDarkMode }) {
  return (
    // Removed "justify-between" from the outer wrapper — that was pushing
    // logo to the top and balance card to the middle with a big empty gap.
    // Now everything flows top-to-bottom naturally, and only the dark mode
    // toggle gets pushed to the bottom using "mt-auto".
    <aside className="w-full lg:w-56 bg-white dark:bg-slate-800 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700 border-t-4 border-t-teal-600 flex flex-row lg:flex-col items-center lg:items-stretch gap-4 lg:gap-4 p-4 lg:p-5 transition-colors">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center shrink-0">
          <Wallet size={16} className="text-white" />
        </div>
        <span className="font-semibold text-slate-800 dark:text-white text-sm">ExpenseTracker</span>
      </div>

      {/* Total balance — now sits right below the logo, not centered in the middle */}
      <div className="flex-1 lg:flex-none bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-3 lg:p-4 max-w-[200px] lg:max-w-none">
        <p className="text-xs text-teal-700/70 dark:text-teal-300/70 mb-1">Total balance</p>
        <p className="text-lg lg:text-xl font-bold text-teal-700 dark:text-teal-300">
          PKR {totalAmount.toLocaleString()}
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
          Across {totalExpenses} expense{totalExpenses !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Dark mode toggle — "lg:mt-auto" pushes it to the bottom on desktop only.
          On mobile (flex-row layout) it just stays inline since there's no vertical space to push into. */}
<button
  onClick={onToggleDarkMode}
  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 lg:mt-auto"
>
  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
  {darkMode ? 'Light mode' : 'Dark mode'}
</button>
    </aside>
  );
}

export default Sidebar;