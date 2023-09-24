import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const email = process.env.EMAIL_SERVER_USER;
const pass = process.env.EMAIL_SERVER_PASSWORD;
const port = process.env.EMAIL_SERVER_PORT;
const host = process.env?.EMAIL_SERVER_HOST ?? 'smtp.gmail.com';

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

export async function POST(req: Request, res: NextApiResponse) {
  const data = await req.json();
  if (!data || !data.name || !data.email || !data.subject || !data.message) {
    return NextResponse.json(
      { message: 'POST error', error: 'Bad request' },
      { status: 400 }
    );
  }

  try {
    const mailOption = {
      from: 'Sieu Toc Web',
      to: data.email,
      subject: 'Welcome to Sieu Toc Web',
      html: `<H3>Sieu Toc Web - Confirm your email with <a href="#">link</a></H3>`,
    };
    await transporter.sendMail(mailOption, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        return NextResponse.json(
          { message: 'Mail sent success' },
          { status: 200 }
        );
      }
    });

    return NextResponse.json({ message: 'Mail sent success' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err?.message }, { status: 400 });
  }
}
