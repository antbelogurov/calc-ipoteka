import { z } from 'zod'

// Схема для добавления новой записи в таблицу займов.
// Zod проверяет типы И бизнес-правила (> 0), возвращает понятные ошибки.
export const addEntrySchema = z.object({
  date: z.string(),

  mortgageBalance: z
    .number({ required_error: 'Укажите остаток по ипотеке' })
    .positive('Сумма должна быть больше нуля'),

  mortgagePayment: z
    .number({ required_error: 'Укажите платёж по ипотеке' })
    .positive('Сумма должна быть больше нуля'),

  creditBalance: z
    .number({ required_error: 'Укажите остаток по кредиту' })
    .positive('Сумма должна быть больше нуля'),

  creditPayment: z
    .number({ required_error: 'Укажите платёж по кредиту' })
    .positive('Сумма должна быть больше нуля'),
})

// Тип выводится автоматически из схемы
export type AddEntryInput = z.infer<typeof addEntrySchema>
