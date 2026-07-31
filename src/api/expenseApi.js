// This is our ONLY file that talks to the backend.
// Components never call fetch() directly — they always import functions from here.
const BASE_URL = 'https://expensetracker-backend-7i02.onrender.com/api/expenses';
// GET all expenses, with optional filters like { category: 'food', search: 'milk' }
export async function getAllExpenses(filters = {}) {
  // Build a query string from the filters object, but skip any empty values
  // e.g. { category: 'food', search: '' } becomes "category=food"
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const queryString = params.toString(); // e.g. "category=food&search=milk"
  const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

  const response = await fetch(url);
  return response.json(); // convert the raw response into usable JS data
}

// GET the stats summary
export async function getStats() {
  const response = await fetch(`${BASE_URL}/stats`);
  return response.json();
}

// POST — create a new expense
export async function createExpense(data) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // tells backend "this body is JSON"
    body: JSON.stringify(data), // convert JS object into a JSON string to send
  });
  return response.json();
}

// PUT — update an existing expense by id
export async function updateExpense(id, data) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

// DELETE — remove an expense by id
export async function deleteExpense(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}
// BONUS — triggers a CSV file download in the browser
// We can't just fetch() and return JSON here because the response is a file, not JSON
export function exportExpensesCSV() {
  // Simply opening this URL makes the browser download the file,
  // because the backend sends "Content-Disposition: attachment" headers
  window.open(`${BASE_URL}/export`, '_blank');
}