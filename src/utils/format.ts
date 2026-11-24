import { Language, StockStatus } from '../types/commerce';

export function formatPriceIqd(amount: number, lang: Language): string {
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

  if (lang === 'en') {
    return `${formatted} IQD`;
  }
  return `${formatted} د.ع`;
}

export function formatDate(isoDate: string, lang: Language): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  const locale = lang === 'en' ? 'en-US' : lang === 'ar' ? 'ar-IQ' : 'en-GB';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function computeStockStatus(stock: number): StockStatus {
  if (stock <= 0) return 'out_of_stock';
  if (stock <= 5) return 'low_stock';
  return 'in_stock';
}
