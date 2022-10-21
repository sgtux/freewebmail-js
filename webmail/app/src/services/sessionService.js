const crypto = require('crypto')
const { sessionExpireInMinutes, tokenSecret } = require('../config')

let sessions = []

const sessionIsValid = session => {
    const elapsedSeconds = parseInt((new Date().getTime() - session.date.getTime()) / 1000)
    return elapsedSeconds < (sessionExpireInMinutes * 60)
}

const clearInvalidSessions = () => {
    sessions = sessions.filter(p => sessionIsValid(p))
}

const createSession = username => {
    const input = `${username}${new Date().getTime()}${tokenSecret}`
    const hash = crypto.createHash('sha256').update(input).digest('hex')
    sessions = sessions.filter(p => p.username !== username)
    sessions.push({ username, hash, date: new Date() })
    return hash
}

const getSession = hash => {
    clearInvalidSessions()
    return sessions.filter(p => p.hash === hash)[0]
}

module.exports = {
    createSession,
    getSession
}