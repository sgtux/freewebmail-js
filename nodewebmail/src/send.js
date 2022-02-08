"use strict";
const nodemailer = require("nodemailer");

async function main() {

  let transporter = nodemailer.createTransport({
    host: "172.17.0.2",
    port: 25,
    secure: false, // true for 465, false for other ports
          tls: {
                  rejectUnauthorized: false
          }
  });

  let info = await transporter.sendMail({
    from: '"Funcionou hahaha" <tom@example.com>', // sender address
    to: "mag@example.com, tom@example.com", // list of receivers
    subject: "Hellow pessoar", // Subject line
    text: "Estamos todos aqui", // plain text body
    html: "<b>Hellow pessoal com texto em HTML</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);