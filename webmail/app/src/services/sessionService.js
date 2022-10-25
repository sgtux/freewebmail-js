const crypto = require('crypto')
const fs = require('fs')
const { sessionExpireInMinutes, tokenSecret } = require('../config')

const SESSION_PATH = './sessions.json'

let sessions = []

if (fs.existsSync(SESSION_PATH)) {
    sessions = JSON.parse(fs.readFileSync(SESSION_PATH, { encoding: 'utf-8', flag: 'r' }))
}


const sessionIsValid = session => {
    const elapsedSeconds = parseInt((new Date().getTime() - new Date(session.date).getTime()) / 1000)
    return elapsedSeconds < (sessionExpireInMinutes * 60)
}

const clearInvalidSessions = () => {
    sessions = sessions.filter(p => sessionIsValid(p))
}

const saveSessions = () => {
    fs.writeFileSync(SESSION_PATH, JSON.stringify(sessions))
}

const createSession = username => {
    const input = `${username}${new Date().getTime()}${tokenSecret}`
    const hash = crypto.createHash('sha256').update(input).digest('hex')
    sessions = sessions.filter(p => p.username !== username)
    sessions.push({ username, hash, date: new Date() })
    saveSessions()
    return hash
}

const getSession = hash => {
    clearInvalidSessions()
    saveSessions()
    return sessions.filter(p => p.hash === hash)[0]
}

module.exports = {
    createSession,
    getSession
}