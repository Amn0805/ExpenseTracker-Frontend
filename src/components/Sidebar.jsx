import { Wallet, Moon, Sun } from 'lucide-react';

function Sidebar({ totalAmount, totalExpenses, darkMode, onToggleDarkMode }) {
  return (
    // "lg:sticky lg:top-0 lg:h-screen" — sirf desktop (lg+) par sidebar ko
    // viewport ki height jitna fixed rakhta hai aur scroll pe apni jagah chipka deta hai.
    // Mobile par ye normal top bar hi rehta hai (koi sticky behavior nahi, zaroorat nahi).
    // "lg:overflow-y-auto" agar sidebar ka content kabhi bara ho jaye to khud scroll kare,
    // page ko scroll karne ki zaroorat na pade.
    <aside className="w-full lg:w-56 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto bg-white dark:bg-slate-800 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700 border-t-4 border-t-teal-600 flex flex-col gap-3 lg:gap-4 p-4 lg:p-5 transition-colors shrink-0">

      <div className="flex items-center justify-between lg:justify-start">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center shrink-0">
            <Wallet size={16} className="text-white" />
          </div>
          <span className="font-semibold text-slate-800 dark:text-white text-sm">ExpenseTracker</span>
        </div>

        <button
          onClick={onToggleDarkMode}
          className="lg:hidden w-9 h-9 shrink-0 flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-3 lg:p-4">
        <p className="text-xs text-teal-700/70 dark:text-teal-300/70 mb-1">Total balance</p>
        <p className="text-lg lg:text-xl font-bold text-teal-700 dark:text-teal-300">
          PKR {totalAmount.toLocaleString()}
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
          Across {totalExpenses} expense{totalExpenses !== 1 ? 's' : ''}
        </p>
      </div>

      {/* "lg:mt-auto" ab sidebar ki poori viewport-height ke bottom tak push karega,
          taake button hamesha bottom pe fixed dikhe, scroll se unaffected */}
      <button
        onClick={onToggleDarkMode}
        className="hidden lg:flex w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-xl transition-colors items-center justify-center gap-2 lg:mt-auto"
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        {darkMode ? 'Light mode' : 'Dark mode'}
      </button>
    </aside>
  );
}

export default Sidebar;