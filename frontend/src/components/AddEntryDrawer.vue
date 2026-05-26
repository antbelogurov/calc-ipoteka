<script setup lang="ts">
import { reactive } from 'vue'
import { z } from 'zod'
import Drawer from 'primevue/drawer'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { addEntrySchema } from '@/tools/schemas.ts'
import { useLoansTable } from '@/composables/useLoansTable.ts'

// v-model:visible управляется снаружи (из App.vue)
const visible = defineModel('visible', { default: false })

const { addEntry } = useLoansTable()

// Поля формы — явно типизируем number | null, иначе TS выводит тип null
const form = reactive<{
  mortgageBalance: number | null
  mortgagePayment: number | null
  creditBalance: number | null
  creditPayment: number | null
}>({
  mortgageBalance: null,
  mortgagePayment: null,
  creditBalance: null,
  creditPayment: null,
})

// Ошибки валидации под каждым полем
const errors = reactive({
  mortgageBalance: '',
  mortgagePayment: '',
  creditBalance: '',
  creditPayment: '',
})

// Явное перечисление вместо Object.keys — TS не умеет гарантировать тип ключа через string
const clearErrors = () => {
  errors.mortgageBalance = ''
  errors.mortgagePayment = ''
  errors.creditBalance = ''
  errors.creditPayment = ''
}

const resetForm = () => {
  form.mortgageBalance = null
  form.mortgagePayment = null
  form.creditBalance = null
  form.creditPayment = null
  clearErrors()
}

// async — потому что addEntry теперь делает запрос к серверу
const handleSave = async () => {
  clearErrors()

  // Дата — сегодня в формате YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0]

  const result = addEntrySchema.safeParse({ date: today, ...form })

  if (!result.success) {
    // z.flattenError() — новый способ в Zod v4, flatten() на экземпляре устарел
    const fieldErrors = z.flattenError(result.error).fieldErrors
    errors.mortgageBalance = fieldErrors.mortgageBalance?.[0] ?? ''
    errors.mortgagePayment = fieldErrors.mortgagePayment?.[0] ?? ''
    errors.creditBalance   = fieldErrors.creditBalance?.[0] ?? ''
    errors.creditPayment   = fieldErrors.creditPayment?.[0] ?? ''
    return
  }

  // Валидация прошла — POST на сервер, потом закрываем
  await addEntry(result.data)
  resetForm()
  visible.value = false
}

const handleCancel = () => {
  resetForm()
  visible.value = false
}
</script>

<template>
  <Drawer v-model:visible="visible" position="right" header="Добавить запись" :style="{ width: '380px' }">

    <div class="drawer-body">

      <!-- ── Ипотека ── -->
      <section class="form-section">
        <h3 class="section-title">Ипотека</h3>

        <div class="field">
          <label class="field-label">Остаток</label>
          <InputNumber
            v-model="form.mortgageBalance"
            :min="0"
            locale="ru-RU"
            :useGrouping="true"
            fluid
            :invalid="!!errors.mortgageBalance"
            placeholder="4 500 000"
          />
          <span v-if="errors.mortgageBalance" class="field-error">{{ errors.mortgageBalance }}</span>
        </div>

        <div class="field">
          <label class="field-label">Платёж</label>
          <InputNumber
            v-model="form.mortgagePayment"
            :min="0"
            locale="ru-RU"
            :useGrouping="true"
            fluid
            :invalid="!!errors.mortgagePayment"
            placeholder="42 150"
          />
          <span v-if="errors.mortgagePayment" class="field-error">{{ errors.mortgagePayment }}</span>
        </div>
      </section>

      <!-- ── Кредит ── -->
      <section class="form-section">
        <h3 class="section-title">Кредит</h3>

        <div class="field">
          <label class="field-label">Остаток</label>
          <InputNumber
            v-model="form.creditBalance"
            :min="0"
            locale="ru-RU"
            :useGrouping="true"
            fluid
            :invalid="!!errors.creditBalance"
            placeholder="500 000"
          />
          <span v-if="errors.creditBalance" class="field-error">{{ errors.creditBalance }}</span>
        </div>

        <div class="field">
          <label class="field-label">Платёж</label>
          <InputNumber
            v-model="form.creditPayment"
            :min="0"
            locale="ru-RU"
            :useGrouping="true"
            fluid
            :invalid="!!errors.creditPayment"
            placeholder="17 200"
          />
          <span v-if="errors.creditPayment" class="field-error">{{ errors.creditPayment }}</span>
        </div>
      </section>

    </div>

    <!-- Кнопки в футере Drawer -->
    <template #footer>
      <div class="drawer-footer">
        <Button label="Отмена" severity="secondary" outlined @click="handleCancel" />
        <Button label="Сохранить" icon="pi pi-check" @click="handleSave" />
      </div>
    </template>

  </Drawer>
</template>

<style scoped>
.drawer-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem 0;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--p-text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--p-surface-border);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 500;
}

.field-error {
  font-size: 0.8rem;
  color: #f87171;
}

.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
