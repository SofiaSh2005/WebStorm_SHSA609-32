<template>
  <div class="p-4">


    <DataTable :value="seans">

      <Column field="id" header="ID" />
      <Column field="klient_id" header="Клиент ID" />
      <Column field="kosmetolog_id" header="Косметолог ID" />
      <Column field="data_vremya" header="Дата/время" />

    </DataTable>

  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from "@/stores/dataStore";

export default {
  components: {
    DataTable,
    Column
  },

  data() {
    return {
      dataStore: useDataStore()
    };
  },

  computed: {
    seans() {
      return this.dataStore.seans;
    }
  },

  mounted() {
    this.dataStore.get_seans();
  }
};
</script>