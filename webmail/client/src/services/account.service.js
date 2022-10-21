import axios from 'axios'

import { storageService } from './storage.service'

const getData = () => {
    return axios.get('/api/account', { headers: { authorization: `bearer ${storageService.getToken()}` } }).then(p => p.data)
}

const login = (username, password) => axios.post('/api/token', { username, password }).then(p => p.data)

export const accountService = {
    login,
    getData
}