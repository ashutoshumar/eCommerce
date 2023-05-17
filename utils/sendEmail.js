"use strict";
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

 // let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    service: 'gmail', // true for 465, false for other ports
    auth: {
      user: process.env.SMPT_MAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  });


 
};

module.exports = sendEmail;