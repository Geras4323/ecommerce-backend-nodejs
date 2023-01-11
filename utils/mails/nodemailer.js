const nodemailer = require("nodemailer");
require('dotenv').config();


async function sendEMail(emailInfo) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
    }
  });

  // send mail with defined transport object.
  await transporter.sendMail({
    ...emailInfo,
    from: process.env.GMAIL_MAIL,
  });

  return { message: 'Email sent successfully' }
}

module.exports = { sendEMail };