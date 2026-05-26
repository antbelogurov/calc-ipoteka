import { ref, computed } from 'vue'
import { fmt, fmtDate, fmtPct } from '@/tools/format.js'

/**
 * rawData — module-level ref.
 * Это значит что все компоненты, вызывающие useLoansTable(),
 * работают с одним и тем же массивом. Изменение в одном месте
 * моментально отражается везде — как мини-стор без Pinia.
 */
const rawData = ref([
  { date: '2024-01-01', mortgageBalance: 4_500_000, mortgagePayment: 42_150, creditBalance: 500_000, creditPayment: 17_200 },
  { date: '2024-02-01', mortgageBalance: 4_493_475, mortgagePayment: 42_150, creditBalance: 488_842, creditPayment: 17_200 },
  { date: '2024-03-01', mortgageBalance: 4_486_899, mortgagePayment: 42_150, creditBalance: 477_548, creditPayment: 17_200 },
  { date: '2024-04-01', mortgageBalance: 4_480_272, mortgagePayment: 42_150, creditBalance: 466_116, creditPayment: 17_200 },
  { date: '2024-05-01', mortgageBalance: 4_473_592, mortgagePayment: 42_150, creditBalance: 454_542, creditPayment: 17_200 },
  { date: '2024-06-01', mortgageBalance: 4_466_859, mortgagePayment: 42_150, creditBalance: 442_825, creditPayment: 17_200 },
  { date: '2024-07-01', mortgageBalance: 4_460_072, mortgagePayment: 42_150, creditBalance: 430_961, creditPayment: 17_200 },
  { date: '2024-08-01', mortgageBalance: 4_453_231, mortgagePayment: 42_150, creditBalance: 418_949, creditPayment: 17_200 },
])

export function useLoansTable() {
  // Добавить новую запись первой в таблицу
  const addEntry = (entry) => {
    rawData.value.unshift(entry)
  }

  // Вычисляем итоги и динамику для каждой строки
  const tableData = computed(() =>
    rawData.value.map((row, i) => {
      const totalBalance = row.mortgageBalance + row.creditBalance
      const totalPayment = row.mortgagePayment + row.creditPayment

      if (i === 0) {
        return {
          ...row,
          totalBalance,
          totalPayment,
          dynamicsDebt: null,
          dynamicsPayment: null,
          dynamicsDebtPct: null,
          dynamicsPaymentPct: null,
        }
      }

      const prev = rawData.value[i - 1]
      const prevTotalBalance = prev.mortgageBalance + prev.creditBalance
      const prevTotalPayment = prev.mortgagePayment + prev.creditPayment

      const dynamicsDebt = totalBalance - prevTotalBalance
      const dynamicsPayment = totalPayment - prevTotalPayment
      const dynamicsDebtPct = (dynamicsDebt / prevTotalBalance) * 100
      const dynamicsPaymentPct = prevTotalPayment !== 0 ? (dynamicsPayment / prevTotalPayment) * 100 : 0

      return { ...row, totalBalance, totalPayment, dynamicsDebt, dynamicsPayment, dynamicsDebtPct, dynamicsPaymentPct }
    })
  )

  const dynClass = (value) => {
    if (value == null) return ''
    return value < 0 ? 'dyn-good' : 'dyn-bad'
  }

  return { tableData, dynClass, addEntry, fmt, fmtDate, fmtPct }
}
