import { ref, computed } from 'vue'
import { fmt, fmtDate, fmtPct } from '@/tools/format.ts'
import { useLoansApi, type Loan } from './useLoansApi.ts'

const { fetchLoans, createLoan, deleteLoan } = useLoansApi()

/**
 * rawData — module-level ref: все компоненты работают с одним массивом.
 * Теперь данные приходят с бэкенда, а не захардкожены.
 */
const rawData = ref<Loan[]>([])

// Загружаем данные один раз при первом импорте модуля
fetchLoans().then((data) => {
  rawData.value = data
})

export function useLoansTable() {
  // Добавить новую запись — сначала POST на сервер, потом обновляем локальный стейт
  const addEntry = async (entry: Omit<Loan, 'id'>): Promise<void> => {
    const newLoan = await createLoan(entry)
    rawData.value.unshift(newLoan)
  }

  // Удалить запись — DELETE на сервер, потом убираем из локального стейта
  const deleteEntry = async (id: number): Promise<void> => {
    await deleteLoan(id)
    rawData.value = rawData.value.filter((l) => l.id !== id)
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
          dynamicsDebt: null as number | null,
          dynamicsPayment: null as number | null,
          dynamicsDebtPct: null as number | null,
          dynamicsPaymentPct: null as number | null,
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

  const dynClass = (value: number | null): string => {
    if (value == null) return ''
    return value < 0 ? 'dyn-good' : 'dyn-bad'
  }

  return { tableData, dynClass, addEntry, deleteEntry, fmt, fmtDate, fmtPct }
}
