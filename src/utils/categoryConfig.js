import { ShoppingCart, Bus, ShoppingBag, Zap, HeartPulse, Package } from 'lucide-react';

// Ek hi jagah se saari categories ka icon, color, aur badge style control hota hai
// Isse har component mein alag-alag color maps nahi likhne padte
export const categoryConfig = {
  food: {
    label: 'Food',
    icon: ShoppingCart,
    iconBg: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
    amountColor: 'text-teal-600 dark:text-teal-400',
    dot: '#0d9488', // hex version — donut chart CSS mein Tailwind classes kaam nahi karti, isliye hex chahiye
  },
  transport: {
    label: 'Transport',
    icon: Bus,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    amountColor: 'text-blue-600 dark:text-blue-400',
    dot: '#2563eb',
  },
  shopping: {
    label: 'Shopping',
    icon: ShoppingBag,
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    amountColor: 'text-amber-600 dark:text-amber-400',
    dot: '#d97706',
  },
  utilities: {
    label: 'Utilities',
    icon: Zap,
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    amountColor: 'text-orange-600 dark:text-orange-400',
    dot: '#ea580c',
  },
  health: {
    label: 'Health',
    icon: HeartPulse,
    iconBg: 'bg-rose-100 dark:bg-rose-900/30',
    iconColor: 'text-rose-600 dark:text-rose-400',
    amountColor: 'text-rose-600 dark:text-rose-400',
    dot: '#e11d48',
  },
  other: {
    label: 'Other',
    icon: Package,
    iconBg: 'bg-slate-100 dark:bg-slate-700',
    iconColor: 'text-slate-600 dark:text-slate-300',
    amountColor: 'text-slate-600 dark:text-slate-300',
    dot: '#64748b',
  },
};