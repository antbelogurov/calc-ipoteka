import Fastify from 'fastify'
import cors from '@fastify/cors'
import loansRoutes from './routes/loans.js'

const fastify = Fastify({
  // logger: true выводит каждый запрос в консоль — удобно при разработке
  logger: true,
})

// CORS — разрешаем запросы с фронтенда (порт 3030)
await fastify.register(cors, {
  origin: 'http://localhost:3030',
})

// Подключаем роуты займов с префиксом /api
await fastify.register(loansRoutes, { prefix: '/api' })

// Запускаем сервер
try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
