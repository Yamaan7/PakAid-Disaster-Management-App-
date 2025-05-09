import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `₨${amount.toLocaleString()}`;
}

export function calculateProgress(current: number | undefined | null, target: number | undefined | null): number {
  if (!current || !target || target <= 0) return 0;
  const progress = (current / target) * 100;
  return Math.min(100, Math.max(0, Math.round(progress)));
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'urgent':
      return 'bg-danger text-white';
    case 'ongoing':
      return 'bg-accent text-white';
    case 'past':
      return 'bg-gray-500 text-white';
    case 'active':
      return 'bg-success text-white';
    default:
      return 'bg-neutral-light text-neutral-dark';
  }
}

