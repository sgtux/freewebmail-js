const config = require('../config')

const getByUsername = username => config.users.filter(p => p.username === username)[0]

module.exports = {
    getByUsername
}