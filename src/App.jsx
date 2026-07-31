import { useState, useEffect } from 'react';
import { Receipt, Wallet } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterBar from './components/FilterBar';
import StatsPanel from './components/StatsPanel';
import { getAllExpenses, getStats, createExpense, deleteExpense } from './api/expenseApi';

function App() {
  // All the app's data lives here in App.jsx, then gets passed DOWN to child components as props
  const [expenses, setExpenses] = useState([]);   // list of expenses from backend
  const [stats, setStats] = useState(null);       // stats summary from backend
  const [loading, setLoading] = useState(true);   // true while fetching, shows a loading message
  const [error, setError] = useState(null);       // holds an error message if a fetch fails
  const [darkMode, setDarkMode] = useState(false);  //tracks whether dark mode is currently on

  const [filters, setFilters] = useState({
    category: '',
    search: '',
    minAmount: '',
    maxAmount: '',
  });

   // Whenever darkMode changes, add/remove the "dark" class on the <html> tag.
  // Tailwind's dark: classes only activate when this class is present.
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Fetches the expense list from the backend, applying current filters
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const result = await getAllExpenses(filters);
      setExpenses(result.data);
      setError(null);
    } catch (err) {
      setError('Failed to load expenses. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };
// Fetches the stats summary separately
  const fetchStats = async () => {
    try {
      const result = await getStats();
      setStats(result.data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };
  // Runs once when the app loads, AND every time "filters" changes
  // (because filters is in the dependency array below)
  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  // Runs ONLY once when the app first loads (empty dependency array = run once)
  useEffect(() => {
    fetchStats();
  }, []);

   // Called by ExpenseForm when the user submits a new expense
  const handleCreate = async (data) => {
    await createExpense(data);
     // After creating, refresh BOTH the list and the stats so the UI stays in sync
    fetchExpenses();
    fetchStats();
  };

  // Called by ExpenseList (via ExpenseItem) when the user clicks Delete
  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
    fetchStats();
  };
// Called whenever any filter input changes — updates just that one filter field
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const today = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    // flex-col on mobile (everything stacks), flex-row on desktop (sidebar beside content)
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col lg:flex-row transition-colors">

      <Sidebar
        totalAmount={stats?.totalAmount || 0}
        totalExpenses={stats?.totalExpenses || 0}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Content area: main column + right column, stacked on mobile, side-by-side on desktop */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 lg:p-6">

        {/* MAIN COLUMN */}
        <main className="flex-1 space-y-4 min-w-0">

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Track and manage your expenses</p>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">{today}</span>
          </div>

          {error && (
            <p className="text-sm text-rose-600 bg-rose-50 dark:bg-rose-900/30 dark:text-rose-400 px-4 py-3 rounded-xl">
              {error}
            </p>
          )}

          {/* Stat cards — real data from stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total expenses</p>
                <p className="text-lg font-bold text-slate-800 dark:text-white">
                  {stats?.totalExpenses ?? 0}
                </p>
              </div>
              <Receipt size={20} className="text-slate-300 dark:text-slate-600" />
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total spent</p>
                <p className="text-lg font-bold text-teal-600 dark:text-teal-400">
                  PKR {(stats?.totalAmount ?? 0).toLocaleString()}
                </p>
              </div>
              <Wallet size={20} className="text-teal-200 dark:text-teal-800" />
            </div>
          </div>

          <FilterBar filters={filters} onFilterChange={handleFilterChange} />

          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white mb-3">
              Expenses <span className="text-slate-400 font-normal">({expenses.length})</span>
            </p>

            {loading ? (
              <p className="text-center text-slate-400 dark:text-slate-500 py-10">Loading expenses...</p>
            ) : (
              <ExpenseList expenses={expenses} onDelete={handleDelete} onUpdated={fetchExpenses} />
            )}
          </div>
        </main>

        {/* RIGHT COLUMN — full width on mobile, fixed width on desktop */}
        <aside className="w-full lg:w-80 space-y-4 shrink-0">
          <ExpenseForm onCreate={handleCreate} />
          <StatsPanel stats={stats} />
        </aside>

      </div>
    </div>
  );
}

export default App;