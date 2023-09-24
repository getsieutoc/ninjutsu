import nodemailer from 'nodemailer';

const host = process.env.EMAIL_SERVER_HOST;
const email = process.env.EMAIL_SERVER_USER;
const pass = process.env.EMAIL_SERVER_PASSWORD;
const port = process.env.EMAIL_SERVER_PORT;

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: true,
  service: 'gmail',
  auth: {
    type: 'login',
    user: email,
    pass,
  },
});
