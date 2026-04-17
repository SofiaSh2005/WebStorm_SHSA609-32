import { defineStore } from 'pinia'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useDataStore = defineStore('data', {
    state: () => ({
        klient: [],
        klient_total: 0,

        usluga: [],
        usluga_total: 0,

        errorMessage: '',
        errorCode: ''
    }),

    actions: {


        async get_klient(page = 0, perpage = 5) {
            this.errorMessage = ''

            try {
                const response = await axios.get(`${backendUrl}/klient`, {
                    params: { page, perpage }
                })

                this.klient = response.data

            } catch (error) {
                this.handleError(error)
            }
        },

        async get_klient_total() {
            this.errorMessage = ''

            try {
                const response = await axios.get(`${backendUrl}/klient_total`)
                this.klient_total = response.data

            } catch (error) {
                this.handleError(error)
            }
        },



        async get_usluga(page = 0, perpage = 5) {
            this.errorMessage = ''

            try {
                const response = await axios.get(`${backendUrl}/usluga`, {
                    params: { page, perpage }
                })

                this.usluga = response.data

            } catch (error) {
                this.handleError(error)
            }
        },

        async get_usluga_total() {
            this.errorMessage = ''

            try {
                const response = await axios.get(`${backendUrl}/usluga_total`)
                this.usluga_total = response.data

            } catch (error) {
                this.handleError(error)
            }
        },



        async create_usluga(formData) {
            this.errorMessage = ''
            this.errorCode = 0

            try {
                const response = await axios.post(
                    `${backendUrl}/usluga`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }
                )

                this.errorCode = response.data.code
                this.errorMessage = response.data.message

                return response.data

            } catch (error) {
                this.handleError(error)
                return null
            }
        },


        handleError(error) {
            if (error.response) {
                this.errorCode = 11
                this.errorMessage = error.response.data.message
                console.log(error.response)

            } else if (error.request) {
                this.errorCode = 12
                this.errorMessage = 'Сервер не отвечает'
                console.log(error.request)

            } else {
                this.errorCode = 13
                this.errorMessage = error.message
                console.log(error)
            }
        }

    }
})