const nodemailer = require("nodemailer");

exports.send = async (msg) => {
  try {
    await nodemailer.createTestAccount();
  
    // create reusable transporter object
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL_MSG_FROM,
      to: process.env.EMAIL_MSG_TO,
      subject: msg.subject,
      text: msg.text
    });

  } catch (err) {
    console.error(err);
  }

}