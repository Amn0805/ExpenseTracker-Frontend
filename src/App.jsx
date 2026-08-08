import { useState, useEffect, useRef } from 'react';
import { Receipt, Wallet } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterBar from './components/FilterBar';
import StatsPanel from './components/StatsPanel';
import { getAllExpenses, getStats, createExpense, deleteExpense } from './api/expenseApi';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Tracks whether we've ever successfully loaded data before.
  // Used so the "Loading..." replacement only shows on the very first load —
  // not on every refetch after create/delete, which was causing the list to
  // shrink momentarily and jump the page's scroll position.
  const hasLoadedOnce = useRef(false);

  const [filters, setFilters] = useState({
    category: '',
    search: '',
    minAmount: '',
    maxAmount: '',
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const fetchExpenses = async () => {
    try {
      // Only show the loading state before the first successful load.
      // On later refetches, keep the current list visible while the new
      // data comes in — avoids a layout shift that jumps scroll position.
      if (!hasLoadedOnce.current) {
        setLoading(true);
      }
      const result = await getAllExpenses(filters);
      setExpenses(result.data);
      setError(null);
      hasLoadedOnce.current = true;
    } catch (err) {
      setError('Failed to load expenses. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const result = await getStats();
      setStats(result.data); //satate update 
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  //when filter change call api again 
  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  useEffect(() => {
    fetchStats();
  }, []);

  //new expense create 
  const handleCreate = async (data) => {
    await createExpense(data);
    fetchExpenses(); //latest list 
    fetchStats();  //latest stats
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
    fetchStats();
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const today = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

 return (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col lg:flex-row transition-colors overflow-x-hidden">

    <Sidebar
      totalAmount={stats?.totalAmount || 0}
      totalExpenses={stats?.totalExpenses || 0}
      darkMode={darkMode}
      onToggleDarkMode={toggleDarkMode}
    />

    <div className="flex-1 p-4 lg:p-6 space-y-4">

      {/* Header ab poori width ka hai, dono columns ke UPAR — is se dono
          columns (list + form) neeche ek hi horizontal line se shuru hote hain,
          aur right column ke upar wali khali space khatam ho jati hai */}
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

      {/* Ab dono columns ek hi row mein hain, sab kuch header ke turant neeche
          se shuru hoga — "Add expense" bhi "Total expenses" ke barabar top se aligned hoga */}
      <div className="flex flex-col lg:flex-row gap-4">

        <main className="flex-1 space-y-4 min-w-0">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            {loading && !hasLoadedOnce.current ? (
              <p className="text-center text-slate-400 dark:text-slate-500 py-10">Loading expenses...</p>
            ) : (
              <ExpenseList expenses={expenses} onDelete={handleDelete} onUpdated={fetchExpenses} />
            )}
          </div>
        </main>

        <aside className="w-full lg:w-80 space-y-4 shrink-0">
          <ExpenseForm onCreate={handleCreate} />
          <StatsPanel stats={stats} />
        </aside>

      </div>
    </div>
  </div>
);
}

export default App;