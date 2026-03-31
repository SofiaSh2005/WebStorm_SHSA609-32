import { defineStore } from 'pinia'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        errorMessage: '',
        errorCode: 0
    }),

    actions: {
        async login(credentials) {
            this.errorMessage = ""

            try {
                const response = await axios.post(
                    backendUrl + '/login',
                    credentials
                )

                this.user = response.data.user
                this.token = response.data.token
                this.isAuthenticated = true

                localStorage.setItem('token', response.data.token)

            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message
                } else {
                    this.errorMessage = error.message
                }

                console.log(error)
            }
        },

        async getUser() {
            this.errorMessage = ""

            try {
                const response = await axios.get(
                    backendUrl + '/user',
                    {
                        headers: {
                            Authorization: 'Bearer ' + this.token
                        }
                    }
                )

                this.user = response.data

            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message
                } else {
                    this.errorMessage = error.message
                }

                console.log(error)
            }
        },

        async logout() {
            try {
                const response = await axios.get(
                    backendUrl + '/logout',
                    {
                        headers: {
                            Authorization: 'Bearer ' + this.token
                        }
                    }
                )

                this.errorCode = response.data.code
                this.errorMessage = response.data.message
                this.token = null
                this.user = null
                this.isAuthenticated = false

                localStorage.removeItem('token')

            } catch (error) {
                if (error.response) {
                    this.errorCode = 1
                    this.errorMessage = error.response.data.message
                } else if (error.request) {
                    this.errorCode = 2
                    this.errorMessage = error.message
                } else {
                    this.errorCode = 3
                }

                console.log(error)
            }
        }
    }
})