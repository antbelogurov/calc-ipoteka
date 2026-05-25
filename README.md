# 🏠 Mortgage / Credit Tracker

Калькулятор ипотеки и кредитов с отслеживанием досрочных погашений и расчётом экономии.

> Pet-проект для обучения fullstack-разработке: Fastify + PostgreSQL + Vue 3.

---

## 🎯 Что умеет приложение

- Добавлять ипотеки и кредиты
- Считать ежемесячный платёж и график погашения
- Отслеживать досрочные погашения
- Показывать остаток долга и сэкономленные проценты
- Строить прогноз по выплатам
- (в планах) AI-инсайты и рекомендации

---

## 🛠 Стек

| Слой | Технологии |
|------|-----------|
| Frontend | Vue 3, TypeScript, Pinia, PrimeVue |
| Backend | Node.js, Fastify, Zod |
| База данных | PostgreSQL, Prisma ORM |
| Инфраструктура | Docker, Docker Compose |
| Деплой | Vercel (frontend), Railway (backend), Neon (DB) |
| CI/CD | GitHub Actions |
| AI | OpenAI API |

---

## 📁 Структура проекта

```
calc-ipoteka/
├── backend/              # Fastify API
│   ├── src/
│   │   ├── routes/       # Роуты (loans, payments, auth)
│   │   ├── plugins/      # Fastify-плагины
│   │   ├── schemas/      # Zod-схемы валидации
│   │   └── index.ts      # Точка входа
│   ├── prisma/
│   │   └── schema.prisma # Схема БД
│   ├── .env.example
│   └── package.json
├── frontend/             # Vue 3 SPA
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── stores/       # Pinia stores
│   │   └── main.ts
│   └── package.json
├── docker-compose.yml    # PostgreSQL для локальной разработки
├── plan.md               # Детальный план реализации
├── CLAUDE.md             # Контекст проекта для Claude
└── README.md
```

---

## 🚀 Быстрый старт

### Требования
- Node.js 20+
- Docker + Docker Compose

### Локальный запуск

```bash
# 1. Клонировать репозиторий
git clone https://github.com/your-username/calc-ipoteka.git
cd calc-ipoteka

# 2. Поднять PostgreSQL
docker-compose up -d

# 3. Запустить backend
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev

# 4. Запустить frontend (в новом терминале)
cd frontend
npm install
npm run dev
```

После запуска:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health check: http://localhost:3000/health

---

## 📡 API

### Займы
| Метод | Путь | Описание |
|-------|------|----------|
| `GET` | `/loans` | Список займов |
| `POST` | `/loans` | Создать займ |
| `GET` | `/loans/:id` | Получить займ |
| `PUT` | `/loans/:id` | Обновить займ |
| `DELETE` | `/loans/:id` | Удалить займ |
| `GET` | `/loans/:id/schedule` | График платежей |
| `POST` | `/loans/:id/calculate` | Расчёт с досрочными погашениями |

### Платежи
| Метод | Путь | Описание |
|-------|------|----------|
| `GET` | `/loans/:id/payments` | История платежей |
| `POST` | `/loans/:id/payments` | Добавить платёж |

### Auth
| Метод | Путь | Описание |
|-------|------|----------|
| `POST` | `/auth/register` | Регистрация |
| `POST` | `/auth/login` | Вход |

---

## 🗺 Роадмап

- [x] Инициализация проекта
- [ ] Stage 1 — Backend basics (Fastify + Zod)
- [ ] Stage 2 — PostgreSQL + Prisma
- [ ] Stage 3 — Бизнес-логика (расчёты)
- [ ] Stage 4 — Frontend (Vue 3)
- [ ] Stage 5 — Авторизация (JWT)
- [ ] Stage 6 — Docker + Деплой
- [ ] Stage 7 — CI/CD (GitHub Actions)
- [ ] Stage 8 — AI-интеграции

Подробный план с обучающими вопросами: [plan.md](./plan.md)

---

## 📚 Цель проекта

Обучение fullstack-разработке через создание реального продукта.  
Стек выбран под реальный продакшн-проект для последующей практики.
