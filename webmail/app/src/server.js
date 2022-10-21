const fs = require('fs')
const path = require('path')
const restify = require('restify')
const { emailService, userService, sessionService } = require('./services')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const server = restify.createServer()

server
    .use(restify.plugins.acceptParser(server.acceptable))
    .use(restify.plugins.queryParser())
    .use(restify.plugins.bodyParser())

server.use((req, res, next) => {
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

server.get('/api/messages', (req, res) => {
    const { username } = req.session

    const password = userService.getByUsername(username).password

    emailService.getAll(username, password)
        .then(data => {
            console.log(`Messages: ${data.length}`)
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            res.status(500)
            console.log(err)
            if (typeof (err) === 'string')
                res.end(err)
            else
                res.json(err)
        })
})

server.get('/', function (req, res, next) {
    fs.readFile(path.join(__dirname, '..', 'public/index.html'), function (err, data) {
        if (err) {
            next(err)
            return
        }
        res.setHeader('Content-Type', 'text/html')
        res.writeHead(200)
        res.end(data)
        next()
    })
})

server.post('/api/send', (req, res) => {

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

server.post('/api/token', (req, res) => {
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

server.get('/api/account', (req, res) => {
    const { username } = req.session
    const { email } = userService.getByUsername(username)
    res.json({ username, email })
})

const port = process.env.PORT || 3001

server.listen(port, () => console.log(`Listening on ${port}`))