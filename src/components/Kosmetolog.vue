<template>
  <div class="p-4">

    <DataTable :value="kosmetolog">

      <Column field="id" header="ID" />
      <Column field="fio" header="ФИО" />
      <Column field="specialnost" header="Специальность" />

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
    kosmetolog() {
      return this.dataStore.kosmetolog;
    }
  },

  mounted() {
    this.dataStore.get_kosmetolog();
  }
};
</script>