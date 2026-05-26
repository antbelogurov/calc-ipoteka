<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import Button from 'primevue/button'
import { useLoansTable } from '@/composables/useLoansTable.ts'

// Вся логика и данные — в composable
const { tableData, dynClass, deleteEntry, fmt, fmtDate, fmtPct } = useLoansTable()
</script>

<template>
  <div class="loans-page">
    <div class="page-header">
      <h1 class="page-title">Займы</h1>
      <p class="page-subtitle">История платежей и динамика задолженности</p>
    </div>

    <DataTable :value="tableData" showGridlines stripedRows class="loans-table">

      <!-- ═══ ГРУППИРОВКА ЗАГОЛОВКОВ ═══ -->
      <ColumnGroup type="header">
        <Row>
          <Column header="Дата"       :rowspan="2" />
          <Column header="Ипотека"    :colspan="2" />
          <Column header="Кредит"     :colspan="2" />
          <Column header="Общий долг" :colspan="2" />
          <Column header="Динамика"   :colspan="2" />
          <Column header=""           :colspan="2" />
          <Column header=""           :rowspan="2" />
        </Row>
        <Row>
          <Column header="Остаток" /><Column header="Платёж" />
          <Column header="Остаток" /><Column header="Платёж" />
          <Column header="Остаток" /><Column header="Платёж" />
          <Column header="Долг"   /><Column header="Платёж" />
          <Column header="Долг"   /><Column header="Платёж" />
        </Row>
      </ColumnGroup>

      <!-- ═══ КОЛОНКИ ДАННЫХ ═══ -->

      <Column>
        <template #body="{ data }">{{ fmtDate(data.date) }}</template>
      </Column>

      <!-- Ипотека -->
      <Column>
        <template #body="{ data }">{{ fmt(data.mortgageBalance) }}</template>
      </Column>
      <Column>
        <template #body="{ data }">{{ fmt(data.mortgagePayment) }}</template>
      </Column>

      <!-- Кредит -->
      <Column>
        <template #body="{ data }">{{ fmt(data.creditBalance) }}</template>
      </Column>
      <Column>
        <template #body="{ data }">{{ fmt(data.creditPayment) }}</template>
      </Column>

      <!-- Общий долг -->
      <Column>
        <template #body="{ data }">{{ fmt(data.totalBalance) }}</template>
      </Column>
      <Column>
        <template #body="{ data }">{{ fmt(data.totalPayment) }}</template>
      </Column>

      <!-- Динамика абсолютная -->
      <Column>
        <template #body="{ data }">
          <span :class="dynClass(data.dynamicsDebt)">{{ fmt(data.dynamicsDebt) }}</span>
        </template>
      </Column>
      <Column>
        <template #body="{ data }">
          <span :class="dynClass(data.dynamicsPayment)">{{ fmt(data.dynamicsPayment) }}</span>
        </template>
      </Column>

      <!-- Динамика в процентах -->
      <Column>
        <template #body="{ data }">
          <span :class="dynClass(data.dynamicsDebtPct)">{{ fmtPct(data.dynamicsDebtPct) }}</span>
        </template>
      </Column>
      <Column>
        <template #body="{ data }">
          <span :class="dynClass(data.dynamicsPaymentPct)">{{ fmtPct(data.dynamicsPaymentPct) }}</span>
        </template>
      </Column>

      <!-- Удаление -->
      <Column>
        <template #body="{ data }">
          <Button icon="pi pi-trash" severity="danger" text rounded size="small" @click="deleteEntry(data.id)" />
        </template>
      </Column>

    </DataTable>
  </div>
</template>

<style scoped>
.loans-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.page-subtitle {
  color: var(--p-text-muted-color);
  font-size: 0.95rem;
}

.loans-table {
  font-size: 0.875rem;
}

.dyn-good {
  color: #4ade80;
  font-weight: 600;
}

.dyn-bad {
  color: #f87171;
  font-weight: 600;
}
</style>
