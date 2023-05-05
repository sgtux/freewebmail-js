const supertest = require('supertest')
const server = require('../src/server')

const request = supertest(server)

describe('Api method tests', () => {
    it('Login test', done => {
        request.post('/api/token')
            .send({ username: 'bob', password: '123' })
            .expect(200)
            .end((err, res) => {
                if (err) throw err
                done()
            })
    })
})