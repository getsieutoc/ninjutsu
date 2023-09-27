import { NextResponse } from 'next/server';
import { transporter } from '@/configs/mailer';

export async function POST(req: Request) {
  const mailOption = await req.json();

  if (
    !mailOption ||
    !mailOption.from ||
    !mailOption.to ||
    !mailOption.subject
  ) {
    return NextResponse.json({ message: 'Bad request', status: 400 });
  }
  try {
    await transporter.sendMail(mailOption, function (err, res) {
      if (err) {
        return NextResponse.json({ message: err.message, status: 400 });
      } else {
        return NextResponse.json(
          { message: 'Mail sent success' },
          { status: 200 }
        );
      }
    });

    return NextResponse.json({ message: 'Mail sent success', status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err, status: 400 });
  }
}
