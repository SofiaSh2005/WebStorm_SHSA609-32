import { defineStore } from 'pinia'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useDataStore = defineStore('data', {
    state: () => ({
        klient: [],
        klient_total: 0,

        usluga: [],
        usluga_total: 0,

        kosmetolog: [],
        seans: [],

        errorMessage: '',
        errorCode: 0
    }),

    actions: {

        async get_klient(page = 0, perpage = 5, search = '') {
            try {
                const response = await axios.get(`${backendUrl}/klient`, {
                    params: { page, perpage, search }
                })
                this.klient = response.data
            } catch (error) {
                this.handleError(error)
            }
        },

        async get_klient_total(search = '') {
            try {
                const response = await axios.get(`${backendUrl}/klient_total`, {
                    params: { search }
                })
                this.klient_total = response.data
            } catch (error) {
                this.handleError(error)
            }
        },

        async get_klient_by_id(id) {
            try {
                const res = await axios.get(`${backendUrl}/klient/${id}`)
                return res.data
            } catch (error) {
                this.handleError(error)
            }
        },

        async create_klient(formData) {
            this.errorMessage = ''
            this.errorCode = 0

            try {
                const response = await axios.post(
                    `${backendUrl}/klient`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + localStorage.getItem('token')
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

        async update_klient(id, formData) {
            this.errorMessage = ''
            this.errorCode = 0

            try {
                const response = await axios.post(
                    `${backendUrl}/klient/${id}?_method=PUT`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + localStorage.getItem('token')
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

        async delete_klient(id) {
            try {
                const response = await axios.delete(
                    `${backendUrl}/klient/${id}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }
                )

                this.errorCode = response.data.code
                this.errorMessage = response.data.message
            } catch (error) {
                this.handleError(error)
            }
        },

        async get_seans() {
            try {
                const res = await axios.get(`${backendUrl}/seans`)
                this.seans = res.data
            } catch (error) {
                this.handleError(error)
            }
        },

        async get_kosmetolog() {
            try {
                const res = await axios.get(`${backendUrl}/kosmetolog`)
                this.kosmetolog = res.data
            } catch (error) {
                this.handleError(error)
            }
        },

        async get_usluga(page = 0, perpage = 5) {
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
            try {
                const response = await axios.get(`${backendUrl}/usluga_total`)
                this.usluga_total = response.data
            } catch (error) {
                this.handleError(error)
            }
        },

        create_usluga(formData) {
            return axios.post(`${backendUrl}/usluga`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
        },

        handleError(error) {
            console.log("API ERROR:", error)

            if (error.response) {
                this.errorCode = error.response.status
                this.errorMessage = error.response.data.message || 'Ошибка сервера'
            } else {
                this.errorMessage = 'Нет соединения с сервером'
            }
        }
    }
})