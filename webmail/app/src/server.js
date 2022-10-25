const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { emailService, userService, sessionService } = require('./services')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.use((req, res, next) => {
    if (req.url === '/api/token')
        return next()
    const token = (req.headers.authorization || '').replace(/(B|b)earer /, '')
    const session = sessionService.getSession(token)
    if (session) {
        req.session = session
        return next()
    }
    res.status(401)
    res.end()
})

app.get('/api/messages', (req, res) => {
    const { username } = req.session
    const { mailbox } = (req.query || {})

    const password = userService.getByUsername(username).password

    emailService.getAll(username, password, mailbox)
        .then(data => {
            console.log(`Messages: ${data.length}`)
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            res.status(500)
            console.log(err)
            res.end('Erro interno')
        })
})

app.post('/api/send', (req, res) => {

    const { username } = req.session
    const { to, subject, text, html } = req.body || {}

    if (to && subject && (text || html)) {
        const { email } = userService.getByUsername(username)
        emailService.send(username, email, to, subject, text, html)
            .then(() => res.end('Success.'))
            .catch(err => {
                console.log(err)
                res.end('Error.')
            })
    } else {
        res.end('Invalid Properties')
    }
})

app.post('/api/token', (req, res) => {
    const { username, password } = req.body || {}
    if (username && password) {
        const user = userService.getByUsername(username)
        if (user && user.password === password) {
            const hash = sessionService.createSession(username)
            res.json({ token: hash })
            return
        }
    }
    res.status(401)
    res.end()
})

app.get('/api/account', (req, res) => {
    const { username } = req.session
    const { email } = userService.getByUsername(username)
    res.json({ username, email })
})

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Listening on ${port}`))