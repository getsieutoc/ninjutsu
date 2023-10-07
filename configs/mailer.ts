import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const host = process.env.EMAIL_SERVER_HOST;
const email = process.env.EMAIL_SERVER_USER ?? '';
const pass = process.env.EMAIL_SERVER_PASSWORD ?? '';
const port = Number(process.env.EMAIL_SERVER_PORT) ?? 0;
const transport: SMTPTransport.Options = {
  host,
  port,
  // secure: true,
  // service: 'gmail',
  auth: {
    type: 'LOGIN',
    user: email,
    pass,
  },
};
export const transporter = nodemailer.createTransport(transport);
