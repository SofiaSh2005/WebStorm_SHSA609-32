import { defineStore } from 'pinia'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useDataStore = defineStore('data', {
    state: () => ({
        klient: [],
        klient_total: null,

        usluga: [],
        usluga_total: null,

        errorMessage: ''
    }),

    actions: {

        //КЛИЕНТЫ
        async get_klient(page = 0, perpage = 5) {
            this.errorMessage = ''

            try {
                const response = await axios.get(backendUrl + '/klient', {
                    params: {
                        page: page,
                        perpage: perpage
                    }
                })

                this.klient = response.data

            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message
                } else {
                    this.errorMessage = error.message
                }

                console.log(error)
            }
        },

        async get_klient_total() {
            this.errorMessage = ''

            try {
                const response = await axios.get(backendUrl + '/klient_total')
                this.klient_total = response.data

            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message
                } else {
                    this.errorMessage = error.message
                }

                console.log(error)
            }
        },

        //УСЛУГИ
        async get_usluga(page = 0, perpage = 5) {
            this.errorMessage = ''

            try {
                const response = await axios.get(backendUrl + '/usluga', {
                    params: {
                        page: page,
                        perpage: perpage
                    }
                })

                this.usluga = response.data

            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message
                } else {
                    this.errorMessage = error.message
                }

                console.log(error)
            }
        },

        async get_usluga_total() {
            this.errorMessage = ''

            try {
                const response = await axios.get(backendUrl + '/usluga_total')
                this.usluga_total = response.data

            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message
                } else {
                    this.errorMessage = error.message
                }

                console.log(error)
            }
        }

    }
})