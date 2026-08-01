import { categoryConfig } from '../utils/categoryConfig';

function buildDonutGradient(byCategory) {
  const entries = Object.entries(byCategory);
  const total = entries.reduce((sum, [, data]) => sum + data.total, 0);

  if (total === 0) return 'conic-gradient(#E2E8F0 0% 100%)';

  let cumulative = 0;
  const stops = entries.map(([category, data]) => {
    const start = cumulative;
    const percent = (data.total / total) * 100;
    cumulative += percent;
    const color = categoryConfig[category]?.dot || '#94A3B8';
    return `${color} ${start}% ${cumulative}%`;
  });

  return `conic-gradient(${stops.join(', ')})`;
}

function StatsPanel({ stats }) {
  if (!stats) return null;

  const { byCategory, highestExpense, lowestExpense } = stats;
  const hasCategories = Object.keys(byCategory).length > 0;

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 lg:p-5 transition-colors">
        <h2 className="text-sm lg:text-base font-semibold text-slate-800 dark:text-white mb-3 lg:mb-4">
          Expense summary
        </h2>

        {hasCategories ? (
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Smaller donut on mobile (w-12/h-12) than desktop (w-16/h-16) — was
                taking up too much visual weight relative to the legend beside it */}
            <div
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-full shrink-0 relative"
              style={{ background: buildDonutGradient(byCategory) }}
            >
              <div className="absolute inset-[22%] rounded-full bg-white dark:bg-slate-800" />
            </div>

            <div className="flex-1 space-y-1 lg:space-y-1.5 min-w-0">
              {Object.entries(byCategory).map(([category, data]) => {
                const config = categoryConfig[category] || categoryConfig.other;
                return (
                  <div key={category} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 truncate">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: config.dot }}
                      />
                      {config.label} ({data.count})
                    </span>
                    <span className="font-medium text-slate-800 dark:text-white shrink-0 ml-2">
                      PKR {data.total.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500">No expenses yet.</p>
        )}
      </div>

      {(highestExpense || lowestExpense) && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 lg:p-5 transition-colors">
          <h2 className="text-sm lg:text-base font-semibold text-slate-800 dark:text-white mb-3 lg:mb-4">
            Quick stats
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {highestExpense && (
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Highest</p>
                <p className="text-sm lg:text-base font-bold text-teal-600 dark:text-teal-400">
                  PKR {highestExpense.amount.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                  {highestExpense.title}
                </p>
              </div>
            )}
            {lowestExpense && (
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Lowest</p>
                <p className="text-sm lg:text-base font-bold text-teal-600 dark:text-teal-400">
                  PKR {lowestExpense.amount.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                  {lowestExpense.title}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsPanel;