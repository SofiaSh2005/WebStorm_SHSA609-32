<template>
  <div class="p-4">

    <!-- ФОРМА -->
    <div class="mb-6">
      <h2>
        {{ isEdit ? 'Редактирование клиента' : 'Создание клиента' }}
      </h2>

      <form @submit.prevent="saveKlient" class="flex gap-2 items-center mt-3">

        <InputText v-model="form.fio" placeholder="ФИО" />
        <InputText v-model="form.telefon" placeholder="Телефон" />

        <Button
            type="submit"
            :label="isEdit ? 'Обновить' : 'Создать'"
        />

      </form>
    </div>

    <!-- ПОИСК -->
    <div class="flex gap-2 mb-3">
      <InputText
          v-model="search"
          type="text"
          placeholder="Введите ФИО"
      />

      <Button
          type="button"
          @click="onPushSearchButton"
          icon="pi pi-search"
          label="Найти"
      />
    </div>

    <!-- ТАБЛИЦА -->
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

      <Column header="Действия">
        <template #body="{ data }">
          <div class="flex gap-2">

            <Button
                icon="pi pi-times-circle"
                severity="secondary"
                rounded
                @click="openPopupConfirm($event, data)"
            />

            <Button
                icon="pi pi-file-edit"
                severity="secondary"
                rounded
                @click="selectRow(data)"
            />

          </div>
        </template>
      </Column>

    </DataTable>

    <ConfirmPopup />
    <Toast />

  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";

import { useDataStore } from "@/stores/dataStore";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

export default {
  name: "Klient",

  components: {
    DataTable,
    Column,
    Button,
    InputText,
    ConfirmPopup,
    Toast
  },

  data() {
    return {
      dataStore: useDataStore(),
      confirm: useConfirm(),
      toast: useToast(),

      form: {
        fio: "",
        telefon: ""
      },

      perpage: 5,
      offset: 0,
      search: ""
    };
  },

  computed: {
    klient() {
      return this.dataStore.klient;
    },

    isEdit() {
      return !!this.$route.params.id;
    },

    klientId() {
      return this.$route.params.id;
    },

    klient_total() {
      return this.dataStore.klient_total;
    }
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
      this.dataStore.get_klient(page, this.perpage, this.search);
    },

    onPushSearchButton() {
      this.dataStore.get_klient_total(this.search);
      this.dataStore.get_klient(0, this.perpage, this.search);
    },

    openPopupConfirm(event, data) {
      this.$confirm.require({
        target: event.currentTarget,
        message: `Удалить ${data.id}?`,

        accept: async () => {
          const res = await this.dataStore.delete_klient(data.id);

          if (res?.success === true) {

            await this.dataStore.get_klient(0, this.perpage);
            await this.dataStore.get_klient_total();

            this.toast.add({
              severity: "success",
              summary: "Удалено",
              detail: "Клиент удалён",
              life: 3000
            });

          } else {

            this.toast.add({
              severity: "error",
              summary: "Удаление запрещено",
              detail: res?.message || this.dataStore.errorMessage,
              life: 4000
            });

          }
        }
      });
    },

    async selectRow(data) {
      const klient = await this.dataStore.get_klient_by_id(data.id);

      this.form.fio = klient.fio;
      this.form.telefon = klient.telefon;

      this.$router.push(`/klient/${data.id}`);
    },

    async saveKlient() {
      const fd = new FormData();
      fd.append("fio", this.form.fio);
      fd.append("telefon", this.form.telefon);

      let res;

      if (this.isEdit) {
        res = await this.dataStore.update_klient(this.klientId, fd);
      } else {
        res = await this.dataStore.create_klient(fd);
      }

      if (!res) {
        console.log("ОШИБКА: нет ответа от сервера");
        return;
      }

      if (res.code === 0) {
        await this.dataStore.get_klient(0, this.perpage);
        await this.dataStore.get_klient_total();
        this.$router.push("/klient");
      } else {
        console.log("BACKEND ERROR:", res.message);
      }
    }

  }
};
</script>