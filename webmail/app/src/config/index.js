const EMAIL_SERVER_HOST = process.env.EMAIL_SERVER_HOST || '172.50.50.10'
const EMAIL_SERVER_IMAP_PORT = process.env.EMAIL_SERVER_IMAP_PORT || 143
const EMAIL_SERVER_SMTP_PORT = process.env.EMAIL_SERVER_SMTP_PORT || 25
const EMAIL_SERVER_TLS = process.env.EMAIL_SERVER_TLS || false
const EMAIL_DOMAIN = process.env.EMAIL_DOMAIN || 'example.lab'
const TOKEN_SECRET = process.env.TOKEN_SECRET || '123123123123'
const SESSION_EXPIRE_IN_MINUTES = parseInt(process.env.SESSION_EXPIRE_IN_MINUTES || 30)

module.exports = {
    users: [
        {
            username: 'alice',
            email: `alice@${EMAIL_DOMAIN}`,
            password: '123'
        },
        {
            username: 'bob',
            email: `bob@${EMAIL_DOMAIN}`,
            password: '123'
        },
    ],
    emailServer: {
        host: EMAIL_SERVER_HOST,
        imapPort: EMAIL_SERVER_IMAP_PORT,
        smtpPort: EMAIL_SERVER_SMTP_PORT,
        tls: EMAIL_SERVER_TLS
    },
    tokenSecret: TOKEN_SECRET,
    sessionExpireInMinutes: SESSION_EXPIRE_IN_MINUTES,
}