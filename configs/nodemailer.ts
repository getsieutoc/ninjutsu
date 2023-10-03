import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const transporterList = {
  SendGrid: {
    host: 'smtp.sendgrid.net',
    port: Number(process.env?.EMAIL_SERVER_PORT ?? 587),
    auth: {
      user: process.env.EMAIL_SERVER_USER ?? 'apikey',
      pass: process.env.SENDGRID_API_KEY ?? '', //SENDGRID_API_KEY
    },
  },
  Mailtrap: {
    host: 'smtp.mailtrap.io',
    port: Number(process.env?.EMAIL_SERVER_PORT ?? 2525),
    auth: {
      user: process.env.EMAIL_SERVER_USER ?? '',
      pass: process.env.EMAIL_SERVER_PASSWORD ?? '',
    },
  },
};

export function transporter(transporter: SMTPTransport.Options) {
  return nodemailer.createTransport(transporter);
}
