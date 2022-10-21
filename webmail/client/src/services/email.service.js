import axios from 'axios'

import { storageService } from './storage.service'

const getAll = () => {
    return axios.get('/api/messages', { headers: { authorization: `bearer ${storageService.getToken()}` } })
        .then(p => p.data)
        .catch(err => {
            if (typeof (err.toJSON) === 'function' && err.toJSON().status === 401) {
                storageService.setToken(null)
                storageService.setUser(null)
                window.location.reload()
            }
            throw err
        })
}

const send = (to, subject, text, html) => {
    return axios.post('/api/send', { to, subject, text, html }, { headers: { authorization: `bearer ${storageService.getToken()}` } })
        .then(p => p.data)
        .catch(err => {
            if (typeof (err.toJSON) === 'function' && err.toJSON().status === 401) {
                storageService.setToken(null)
                storageService.setUser(null)
                window.location.reload()
            }
            throw err
        })
}

export const emailService = {
    getAll,
    send
}