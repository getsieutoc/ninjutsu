import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/configs/prisma';
// import { updateUser, getUser } from '@/services/users';

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

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { password, email } = data;
    console.log('password :>> ', password);
    console.log('email :>> ', email);

    if (password && email) {
      // handle send mail
      //...

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
