import Fastify from 'fastify'
import cors from '@fastify/cors'
import loansRoutes from './routes/loans.js'

const fastify = Fastify({
  // logger: true выводит каждый запрос в консоль — удобно при разработке
  logger: true,
})

// CORS — разрешаем любой localhost в dev-режиме (порт может меняться)
// В продакшне origin должен быть конкретным URL из env-переменной
await fastify.register(cors, {
  origin: /^http:\/\/localhost:\d+$/,
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
