import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/configs/prisma';
import { differenceInHours } from 'date-fns';
import { transporter } from '@/configs/mailer';
import { getConfirmCode } from '@/services/users';
import { HOUR_MAX_CONFIRM } from '@/utils/constants';
import { hash } from '@/utils/password';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email } = data;

    if (!email.trim()) {
      return NextResponse.json({ message: 'Email not found', status: 400 });
    }

    const checkEmail = await prisma.user.findUnique({ where: { email } });
    if (!checkEmail) {
      return NextResponse.json({ message: 'Email not found', status: 400 });
    }

    return NextResponse.json({
      message: 'Request is approved',
      data: { email },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Problem when update user', error });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { password, email } = data;

    if (password && email) {
      // Check if the previous code exists or not
      const prevCode = await prisma.user.findUnique({
        where: { email },
        select: { confirmCode: true },
      });
      if (prevCode?.confirmCode) {
        const dateTimeSubmit = Number(prevCode.confirmCode.split(':')[0]);
        const now = Date.now();
        const subD = differenceInHours(now, dateTimeSubmit);
        if (subD < HOUR_MAX_CONFIRM) {
          return NextResponse.json({
            message: 'You have already sent the request before',
            status: 400,
          });
        }
      }

      // handle send mail
      const codeGenerate = encodeURI(await getConfirmCode());
      const storeConfirmCode = await prisma.user.update({
        where: { email },
        data: { confirmCode: codeGenerate },
      });

      if (storeConfirmCode) {
        try {
          const newPassword = await hash(password);
          await transporter.sendMail(
            {
              from: 'Sieu Toc Web',
              to: email,
              subject: 'Confirm reset password',
              text: 'SieuTocWeb v0.1',
              html: `<H3>To reset password, click on the button below:</H3> 
              <button><a href='https://${process.env.SITE_DOMAIN}/forgot-password/confirm-email?code=${codeGenerate}:${newPassword}:${email}'>reset</a></button>`,
            },
            function (err, res) {
              if (err) {
                return NextResponse.json({ message: err.message, status: 400 });
              } else {
                return NextResponse.json(
                  { message: 'Mail sent success' },
                  { status: 200 }
                );
              }
            }
          );
        } catch (error) {
          return NextResponse.json({
            message: error,
            status: 400,
          });
        }
      }

      return NextResponse.json({
        message: 'Please check your email',
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: 'Please input email and password',
        status: 400,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Problem when update user', error });
  }
}
