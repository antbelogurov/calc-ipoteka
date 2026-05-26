/**
 * Утилиты форматирования — числа, даты, проценты.
 * Импортируй нужные функции в компонентах вместо того чтобы писать Intl везде.
 */

// Число с разрядами, без копеек: 4500000 → "4 500 000"
export const fmt = (n: number | null | undefined): string =>
  n == null
    ? '—'
    : new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n)

// Дата из ISO-строки в ДД.ММ.ГГГГ: "2024-01-15" → "15.01.2024"
export const fmtDate = (isoStr: string | null | undefined): string =>
  isoStr == null
    ? '—'
    : new Date(isoStr).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

// Процент со знаком: -1.07 → "-1.07%", 0.5 → "+0.50%"
export const fmtPct = (n: number | null | undefined): string => {
  if (n == null) return '—'
  return (n > 0 ? '+' : '') + n.toFixed(2) + '%'
}

// Сумма в рублях: 42150 → "42 150 ₽"
export const fmtRub = (n: number | null | undefined): string =>
  n == null
    ? '—'
    : new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
      }).format(n)
