<template>
  <DataTable
      :value="usluga"
      :lazy="true"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="usluga_total"
      @page="onPageChange"
      :first="offset"
  >
    <Column field="id" header="ID" />
    <Column field="nazvanie" header="Название услуги" />
    <Column field="stoimost" header="Стоимость" />
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore';

export default {
  name: "Usluga",

  components: { DataTable, Column },

  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0
    };
  },

  computed: {
    usluga() { return this.dataStore.usluga; },
    usluga_total() { return this.dataStore.usluga_total; }
  },

  mounted() {
    this.dataStore.get_usluga(0, this.perpage);
    this.dataStore.get_usluga_total();
  },

  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      const page = this.offset / this.perpage;
      this.dataStore.get_usluga(page, this.perpage);
    }
  }
};
</script>

<style scoped>
</style>