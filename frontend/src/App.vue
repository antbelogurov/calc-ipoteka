<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Button from 'primevue/button'
import AddEntryDrawer from '@/components/AddEntryDrawer.vue'

const drawerVisible = ref(false)
</script>

<template>
  <!-- Навигация сверху -->
  <nav class="topnav">
    <div class="topnav-inner">
      <!-- Логотип слева -->
      <RouterLink to="/" class="logo">
        <span class="logo-icon">🏠</span>
        <span class="logo-text">ИпотекаТрекер</span>
      </RouterLink>

      <!-- Ссылки по центру -->
      <div class="nav-links">
        <RouterLink to="/" class="nav-link" active-class="active">Займы</RouterLink>
        <RouterLink to="/overview" class="nav-link" active-class="active">Обзор</RouterLink>
      </div>

      <!-- Кнопки справа -->
      <div class="nav-actions">
        <Button
          label="Досрочное погашение"
          icon="pi pi-plus"
          size="small"
          @click="drawerVisible = true"
        />
      </div>
    </div>
  </nav>

  <!-- Текущая страница -->
  <main class="main-content">
    <RouterView />
  </main>

  <!-- Drawer открывается по кнопке -->
  <AddEntryDrawer v-model:visible="drawerVisible" />
</template>

<style scoped>
.topnav {
  background-color: var(--p-surface-card);
  border-bottom: 1px solid var(--p-surface-border);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 2rem;
}

.topnav-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 64px;
  max-width: 1280px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-icon {
  font-size: 1.4rem;
}

.logo-text {
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--p-primary-color), var(--p-primary-400, #a78bfa));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
}

.nav-link {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  text-decoration: none;
  color: var(--p-text-muted-color);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.15s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--p-text-color);
  background-color: var(--p-surface-hover);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
