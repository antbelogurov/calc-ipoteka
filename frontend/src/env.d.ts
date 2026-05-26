/// <reference types="vite/client" />

// Говорим TypeScript как обращаться с .vue файлами
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
