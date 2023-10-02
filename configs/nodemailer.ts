// import aws from '@aws-sdk/client-ses';
import nodemailer from 'nodemailer';
// import { defaultProvider } from '@aws-sdk/credential-provider-node';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// const ses = new aws.SES({
//   apiVersion: "2012-10-17",
//   region: "us-east-1",
//   defaultProvider,
// });

export const transporterList = {
  SES: {
    ses: '',
    aws: '',
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
