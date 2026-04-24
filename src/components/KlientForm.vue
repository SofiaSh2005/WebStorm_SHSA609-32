<template>
  <div class="p-4">

    <h2>
      {{ isEdit ? 'Редактирование клиента' : 'Создание клиента' }}
    </h2>

    <form @submit.prevent="save" class="flex flex-col gap-3 w-96">

      <InputText v-model="form.fio" placeholder="ФИО" />
      <InputText v-model="form.telefon" placeholder="Телефон" />

      <Button type="submit">
        {{ isEdit ? 'Сохранить' : 'Создать' }}
      </Button>

    </form>

  </div>
</template>

<script>
import { useDataStore } from '@/stores/dataStore'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

export default {
  components: { InputText, Button },

  data() {
    return {
      store: useDataStore(),
      form: {
        fio: '',
        telefon: ''
      }
    }
  },

  computed: {
    isEdit() {
      return !!this.$route.params.id
    },
    id() {
      return this.$route.params.id
    }
  },

  async mounted() {
    if (this.isEdit) {
      const data = await this.store.get_klient_by_id(this.id)
      this.form.fio = data.fio
      this.form.telefon = data.telefon
    }
  },

  methods: {
    async save() {
      const fd = new FormData()
      fd.append('fio', this.form.fio)
      fd.append('telefon', this.form.telefon)

      if (this.isEdit) {
        await this.store.update_klient(fd, this.id)
      } else {
        await this.store.create_klient(fd)
      }

      this.$router.push('/klient')
    }
  }
}
</script>