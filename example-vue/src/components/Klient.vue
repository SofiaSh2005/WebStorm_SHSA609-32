<template>
  <DataTable
      :value="klient"
      :lazy="true"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="klient_total"
      @page="onPageChange"
      :first="offset"
  >
    <Column field="id" header="ID" />
    <Column field="fio" header="ФИО" />
    <Column field="telefon" header="Телефон" />
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore';

export default {
  name: "Klient",

  components: { DataTable, Column },

  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0
    };
  },

  computed: {
    klient() { return this.dataStore.klient; },
    klient_total() { return this.dataStore.klient_total; }
  },

  mounted() {
    this.dataStore.get_klient(0, this.perpage);
    this.dataStore.get_klient_total();
  },

  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      const page = this.offset / this.perpage;
      this.dataStore.get_klient(page, this.perpage);
    }
  }
};
</script>

<style scoped>
</style>