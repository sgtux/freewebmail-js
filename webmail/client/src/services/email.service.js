import axios from 'axios'

import { StorageKeys } from '../utils'

const getAll = () => {
    const { email, password } = JSON.parse(localStorage.getItem(StorageKeys.USER))
    return axios.get(`/api/messages?user=${email.split('@')[0]}&password=${password}`).then(p => p.data)
}

export const emailService = {
    getAll
}