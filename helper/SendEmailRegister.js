const nodemailer = require('nodemailer');

const sendEmailRegister = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      // type: "OAuth2",
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  const { email, name } = datos;
  // Enviar el email
  const info = await transport.sendMail({
    from: "Disney",
    to: email,
    subject: 'Account Confirmation',
    text: 'This is an email send by Disney to confirm your identity',
    html: `<p>Hello: ${name}, plesae verify your account.</p>
               
            <p>You account is already to be used. This is an email confirmation by Disney Company</p>
               
            <p>Your email register is ${email}</p>   

            <p>If you don't create this account, please contact us</p>
      `
  });

  // console.log("Mensaje enviado: %s", info.messageId);

};


module.exports = sendEmailRegister;