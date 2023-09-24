import { NextRequest, NextResponse } from 'next/server';
import { updateUser, getUser } from '@/services/users';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const user = await getUser({ where: { id } });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: 'Problem when get user', error });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateInput = await req.json();

    const updatedUser = await updateUser(id, updateInput);

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ message: 'Problem when update user', error });
  }
}
