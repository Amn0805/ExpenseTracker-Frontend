import { useState } from 'react';
import { Plus } from 'lucide-react';

// This form lets the user add a new expense.
// "onCreate" is a function passed down from App.jsx — we call it when the form is valid.
function ExpenseForm({ onCreate }) {
   // One state object holding all form fields together (a "controlled form")
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0],     // defaults to today, e.g. "2026-07-30"
    description: '',
  });

  // Holds a validation error message, if any
  const [error, setError] = useState('');

   // Runs every time the user types in ANY input — we detect WHICH input via e.target.name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));   // update just that one field
  };

  const handleSubmit = (e) => {
    e.preventDefault();   // stops the page from refreshing (default browser form behavior)

     // Basic validation before sending anything to the backend
    if (!formData.title.trim() || !formData.amount) {
      setError('Title and amount are required.');
      return;
    }

    setError(''); // clear any old error
    onCreate(formData); // hand the data up to App.jsx, which will call the API

     // Submit button se focus hata do — warna list re-render hone ke baad
  // browser button ko view mein rakhne ke liye page ko neeche scroll kar deta hai
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }

     // Reset the form back to defaults after successful submit
    setFormData({
      title: '',
      amount: '',
      category: 'food',
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
  };

    // Common input styling reused across all fields — keeps the file shorter and consistent
  const inputClass =
    "w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors";
  const labelClass = "block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4 transition-colors"
    >
      <h2 className="text-base font-semibold text-slate-800 dark:text-white flex items-center gap-2">
        <Plus size={16} className="text-teal-600 dark:text-teal-400" />
        Add expense
      </h2>

      {error && (
        <p className="text-sm text-rose-600 bg-rose-50 dark:bg-rose-900/30 dark:text-rose-400 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Grocery shopping"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Amount (PKR)</label>
          <input
            type="number"
            name="amount"
            min="1"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="utilities">Utilities</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description (optional)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add a note..."
          rows="2"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Add expense
      </button>
    </form>
  );
}

export default ExpenseForm;



