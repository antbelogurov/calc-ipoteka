import { z } from 'zod'

// Схема для создания новой записи займа.
// Те же правила что и на фронтенде — единый контракт данных.
export const loanSchema = z.object({
  date: z.string(),
  mortgageBalance: z.number().positive('Сумма должна быть больше нуля'),
  mortgagePayment: z.number().positive('Сумма должна быть больше нуля'),
  creditBalance: z.number().positive('Сумма должна быть больше нуля'),
  creditPayment: z.number().positive('Сумма должна быть больше нуля'),
})

// Тип выводится автоматически из схемы — не нужно писать вручную
export type LoanInput = z.infer<typeof loanSchema>

// Тип записи в БД/файле — то же самое + id
export type Loan = LoanInput & { id: number }
