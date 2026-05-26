/// <reference types="vite/client" />

// Говорим TypeScript как обращаться с .vue файлами
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

// Типизируем наши VITE_* переменные из .env
// Без этого import.meta.env.VITE_API_URL имеет тип any
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
