const fs = require('fs')
const path = require('path')
const restify = require('restify')
const emailService = require('./services/emailService')
const config = require('./config')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const server = restify.createServer()

server
    .use(restify.plugins.acceptParser(server.acceptable))
    .use(restify.plugins.queryParser())
    .use(restify.plugins.bodyParser())

server.get('/api/messages', (req, res) => {
    const { user, password } = (req.query || {})
    if (!user || !password)
        return res.end('Usuário ou senha inválidos.')

    const userDb = config.users.filter(p => p.username === user)[0]
    if (!userDb || userDb.password !== password)
        return res.end('Usuário ou senha inválidos.')

    emailService.getAll(user, password)
        .then(data => {
            console.log(`Messages: ${data.length}`)
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            console.log('ERRO ENCONTRADO!!!')
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
    const { username, from, to, subject, text, html } = req.body || {}

    if (username && from && to && subject && text && html) {

        emailService.send(username, from, to, subject, text, html)
            .then(() => res.end('Success.'))
            .catch(err => {
                console.log(err)
                res.end('Error.')
            })
    } else {
        res.end('Invalid Properties')
    }
})

const port = process.env.PORT || 3001

server.listen(port, () => console.log(`Listening on ${port}`))