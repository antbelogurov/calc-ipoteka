import axios from 'axios'

// Тип одной записи займа — зеркало backend Loan типа
export interface Loan {
  id: number
  date: string
  mortgageBalance: number
  mortgagePayment: number
  creditBalance: number
  creditPayment: number
}

// Axios-инстанс с базовым URL — можно расширять (заголовки, интерсепторы и т.д.)
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
})

/**
 * useLoansApi — composable только с запросами к серверу.
 * Никакого состояния здесь нет — только методы.
 * Axios автоматически парсит JSON и бросает ошибку если статус >= 400.
 */
export function useLoansApi() {
  // GET /loans — получить все записи
  const fetchLoans = async (): Promise<Loan[]> => {
    const { data } = await api.get<Loan[]>('/loans')
    return data
  }

  // POST /loans — создать новую запись, вернуть её с id от сервера
  const createLoan = async (loan: Omit<Loan, 'id'>): Promise<Loan> => {
    const { data } = await api.post<Loan>('/loans', loan)
    return data
  }

  // DELETE /loans/:id — удалить запись по id
  const deleteLoan = async (id: number): Promise<void> => {
    await api.delete(`/loans/${id}`)
  }

  return { fetchLoans, createLoan, deleteLoan }
}
