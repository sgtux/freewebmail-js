const Imap = require('imap')
const {simpleParser} = require('mailparser')


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var imap = Imap({
        user: 'tom',
        password: '123',
        host: '172.17.0.2',
        port: 143,
        tls: false
})

imap.once('ready', function (){
        imap.openBox('INBOX', (err) => {
                console.log('OPENED INBOX')
                if(err){
                        console.log('ERRO AQUI')
                        console.log(err)
                        imap.end()
                        return
                }
//        imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
        imap.search(['SEEN'], (err, results) => {
          const f = imap.fetch(results, {bodies: ''});
          f.on('message', msg => {
                  console.log('ON MESSAGE')
            msg.on('body', stream => {
              simpleParser(stream, async (err, parsed) => {
                console.log(parsed);
              });
            });
            msg.once('attributes', attrs => {
              const {uid} = attrs;
              imap.addFlags(uid, ['\\Seen'], () => {
                console.log('Marked as read!');
              });
            });
          });
          f.once('error', ex => {
            return Promise.reject(ex);
          });
          f.once('end', () => {
            console.log('Done fetching all messages!');
            imap.end();
          });
        });
      });
})

imap.once('error', function (err){ console.log('ERRO AQUI'); console.log(err) })

imap.once('end', function (){ console.log('Connection Ended') })

imap.connect()