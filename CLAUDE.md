# Mortgage / Credit Tracker — CLAUDE.md

## Контекст проекта

**Название:** Калькулятор ипотеки и кредита (Mortgage/Credit Tracker)  
**Тип:** Pet-проект для обучения fullstack-разработке  
**Автор:** Ant (antbelogurov@gmail.com)

Цель проекта — не только создать полезный инструмент для отслеживания ипотеки и кредитов, но и **пройти обучение** по всему fullstack-стеку через реальную разработку продукта.

---

## Цель обучения

Стать AI-powered fullstack/product-инженером, способным самостоятельно строить и деплоить SaaS-продукты.

**Текущие сильные стороны:**
- Сильный Vue/TypeScript frontend-бэкграунд
- Реальный опыт в продакшн
- Понимание UI/UX
- Знание современного frontend-экосистема

**Основные пробелы:**
- PostgreSQL / SQL
- Backend-архитектура
- Деплой / DevOps
- Product ownership mindset

---

## Технологический стек

### Frontend
- **Vue 3**
- **TypeScript**
- **Pinia** (state management)
- **PrimeVue** (UI-компоненты)

### Backend
- **Node.js**
- **Fastify**
- **Prisma** (ORM)
- **PostgreSQL**

### Infrastructure
- **Docker** + **Docker Compose**
- **GitHub Actions** (CI/CD)
- **Railway / Render** (backend deploy)
- **Vercel** (frontend deploy)
- **Neon** (managed PostgreSQL)

### AI (позже)
- OpenAI APIs
- Streaming responses
- Базовые AI-интеграции

---

## Функциональность приложения

- Добавление займов / ипотек
- Отслеживание досрочных погашений (овerpayments)
- Расчёт остатка долга
- Расчёт сэкономленных процентов
- Прогнозы по выплатам (payoff projections)
- Хранение всех данных в PostgreSQL

---

## Роадмап обучения

### Stage 1 — Backend basics (1–2 недели)
- [ ] Освежить Node.js
- [ ] Изучить Fastify: routes / plugins / hooks
- [ ] Построить простой REST API
- [ ] Валидация запросов через Zod

### Stage 2 — PostgreSQL + Prisma (2 недели)
- [ ] Поднять PostgreSQL локально или через Docker
- [ ] Изучить SQL: SELECT, INSERT, UPDATE, DELETE, JOIN, indexes
- [ ] Создать Prisma-схему
- [ ] Изучить миграции
- [ ] CRUD для займов

### Stage 3 — Fullstack app (2–4 недели)
- [ ] Подключить Vue-frontend к backend
- [ ] Формы для займов и овerpayments
- [ ] Dashboard
- [ ] Графики / статистика
- [ ] Хранение данных в БД

### Stage 4 — Auth (1 неделя)
- [ ] JWT-авторизация
- [ ] Login / Register
- [ ] Защищённые роуты

### Stage 5 — Docker + деплой (2 недели)
- [ ] Докеризация backend
- [ ] PostgreSQL-контейнер
- [ ] docker-compose
- [ ] Деплой: Frontend → Vercel, Backend → Railway/Render, DB → Neon

### Stage 6 — CI/CD basics (1 неделя)
- [ ] GitHub Actions: install / lint / test / build
- [ ] Авто-деплой при push

### Stage 7 — AI-интеграции (позже)
- [ ] AI-инсайты по займам
- [ ] Финансовые рекомендации
- [ ] Прогнозы

---

## Правила разработки

### ✅ Делаем
- Простую, понятную архитектуру
- REST API (Fastify)
- Один монорепо или простое разделение `backend/` + `frontend/`
- Учимся на реальном коде, а не на курсах

### ❌ Избегаем (пока)
- Kubernetes
- Микросервисы
- Kafka
- GraphQL
- Overengineering
- Сложные архитектурные паттерны

---

## Структура проекта (план)

```
calc-ipoteka/
├── backend/          # Fastify + Prisma + PostgreSQL
│   ├── src/
│   │   ├── routes/
│   │   ├── plugins/
│   │   ├── schemas/  # Zod-схемы
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
├── frontend/         # Vue 3 + TypeScript + Pinia + PrimeVue
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── stores/
│   │   └── main.ts
│   └── package.json
├── docker-compose.yml
└── CLAUDE.md
```

---

## Инструкции для Claude

- Это обучающий проект — **объясняй решения**, не просто пиши код
- При создании backend-кода используй **Fastify** (не Express)
- ORM — только **Prisma**
- Валидация — только **Zod**
- Frontend — **Vue 3 Composition API** + TypeScript, без Options API
- Комментарии в коде на русском языке приветствуются
- Предпочитай простые решения сложным
- Если есть несколько подходов — объясни trade-offs
