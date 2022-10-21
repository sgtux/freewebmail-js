const EMAIL_SERVER_HOST = process.env.EMAIL_SERVER_HOST || '172.50.50.10'
const EMAIL_SERVER_IMAP_PORT = process.env.EMAIL_SERVER_IMAP_PORT || 143
const EMAIL_SERVER_SMTP_PORT = process.env.EMAIL_SERVER_SMTP_PORT || 25
const EMAIL_SERVER_TLS = process.env.EMAIL_SERVER_TLS || false

module.exports = {
    users: [
        {
            username: 'alice',
            password: '123'
        },
        {
            username: 'bob',
            password: '123'
        },
    ],
    emailServer: {
        host: EMAIL_SERVER_HOST,
        imapPort: EMAIL_SERVER_IMAP_PORT,
        smtpPort: EMAIL_SERVER_SMTP_PORT,
        tls: EMAIL_SERVER_TLS
    }
}