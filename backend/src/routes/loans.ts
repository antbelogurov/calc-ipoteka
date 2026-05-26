import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import type { FastifyInstance } from 'fastify'
import { loanSchema, type Loan } from '../schemas/loans.js'

// Путь к файлу с данными (работает и на Windows и на Linux)
const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_FILE = join(__dirname, '../data/loans.json')

// Вспомогательные функции для чтения и записи файла
const readLoans = async (): Promise<Loan[]> => {
  const raw = await readFile(DATA_FILE, 'utf-8')
  return JSON.parse(raw) as Loan[]
}

const writeLoans = async (loans: Loan[]): Promise<void> => {
  await writeFile(DATA_FILE, JSON.stringify(loans, null, 2), 'utf-8')
}

// Fastify plugin — регистрируем все роуты для /loans
export default async function loansRoutes(fastify: FastifyInstance) {

  // GET /loans — вернуть все записи
  fastify.get('/loans', async () => {
    return readLoans()
  })

  // POST /loans — добавить новую запись
  fastify.post('/loans', async (request, reply) => {
    // Валидируем тело запроса через Zod
    const result = loanSchema.safeParse(request.body)

    if (!result.success) {
      return reply.status(400).send({
        error: 'Validation failed',
        details: result.error.flatten().fieldErrors,
      })
    }

    const loans = await readLoans()

    // Генерируем новый id — максимальный из существующих + 1
    const newId = loans.length > 0 ? Math.max(...loans.map(l => l.id)) + 1 : 1
    const newLoan: Loan = { id: newId, ...result.data }

    // Добавляем в начало (как в фронтенде — unshift)
    loans.unshift(newLoan)
    await writeLoans(loans)

    return reply.status(201).send(newLoan)
  })

  // DELETE /loans/:id — удалить запись по id
  fastify.delete('/loans/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const loans = await readLoans()

    const index = loans.findIndex(l => l.id === Number(id))
    if (index === -1) {
      return reply.status(404).send({ error: 'Запись не найдена' })
    }

    loans.splice(index, 1)
    await writeLoans(loans)

    return reply.status(204).send()
  })

}
