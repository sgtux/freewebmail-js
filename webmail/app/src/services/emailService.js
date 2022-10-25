const nodemailer = require('nodemailer');
const Imap = require('imap')
const { simpleParser } = require('mailparser')

const config = require('../config')

const send = async (username, from, to, subject, text, html) => {
    let transporter = nodemailer.createTransport({
        host: config.emailServer.host,
        port: config.emailServer.smtpPort,
        secure: config.emailServer.tls,
        tls: config.emailServer.tls
    })

    let info = await transporter.sendMail({
        from: `"${username}" <${from}>`,
        to: Array.isArray(to) ? (to || []).join(', ') : to,
        subject,
        text,
        html,
    })

    console.log("Message sent: %s", info.messageId)

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}

const getAll = (username, password, mailbox) => {
    return new Promise((resolve, reject) => {
        try {
            const imap = Imap({
                user: username,
                password,
                host: config.emailServer.host,
                port: config.emailServer.imapPort,
                tls: config.emailServer.tls
            })

            const messages = []

            imap.once('ready', function () {
                imap.openBox(mailbox, (err) => {
                    if (err) {
                        imap.end()
                        return reject(`ERRO AQUI (OPENED INBOX): ${err}`)
                    }

                    //        imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {

                    imap.search([['SINCE', new Date(2020, 0, 1)]], (err, results) => {
                        console.log(results)
                        if (!(results || {}).length)
                            return resolve(messages)

                        const f = imap.fetch(results, { bodies: '' })
                        f.on('message', msg => {
                            let attributes = null
                            msg.on('body', stream => {
                                simpleParser(stream, (err, parsed) => {
                                    let read = false
                                    if ((attributes || {}).flags)
                                        read = attributes.flags.includes('\\Seen')
                                    messages.push({ attributes, ...parsed, read })
                                    console.log('end parsed')
                                })
                            })

                            msg.once('attributes', attrs => {
                                // const { uid } = attrs;
                                console.log({ attrs })
                                attributes = attrs
                                // imap.addFlags(uid, ['\\Seen'], () => {
                                //     console.log('Marked as read!');
                                // });
                            })
                        })
                        f.once('error', ex => {
                            console.log(`Fetch once error: ${ex}`)
                        })
                        f.once('end', () => {
                            console.log('Done fetching all messages!')
                            imap.end()
                        })
                    })
                })
            })

            imap.once('error', function (err) {
                console.log(`Imap once error: ${err}`)
                reject(err)
            })

            imap.once('end', function () {
                console.log('Finalizado!!!')
                setTimeout(() => resolve(messages), 200)
            })

            imap.connect()
        } catch (err) {
            console.log(`ERRO: ${err}`)
            reject(err)
        }
    })
}

module.exports = {
    send,
    getAll
}