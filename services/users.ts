'use server';
import 'server-only';

import { User, UserRole, Prisma } from '@prisma/client';
import { getSession } from '@/configs/auth';
import { exclude } from '@/utils/parsers';
import { prisma } from '@/configs/prisma';
import { hash } from '@/utils/password';
import deepmerge from 'deepmerge';
import { v5 as uuidv5, v4 as uudv4 } from 'uuid';

const richInclude = {
  pages: true,
  posts: true,
};

export type CleanUser = Omit<User, 'password'>;
export type UserWithPayload = Prisma.UserGetPayload<{
  include: typeof richInclude;
}>;

export const getUser = async ({
  where,
}: {
  where: Prisma.UserWhereUniqueInput;
}): Promise<CleanUser | void> => {
  const response = await prisma.user.findUniqueOrThrow({
    where,
  });

  return exclude(response, 'password');
};

export const queryUsers = async ({
  skip,
  take,
  where,
}: {
  skip?: number;
  take?: number;
  where: Prisma.UserWhereInput;
}): Promise<CleanUser[] | void> => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const response = await prisma.user.findMany({
    skip,
    take,
    where,
  });

  return response.map((o) => exclude(o, 'password'));
};

export const updateUser = async (
  id: string,
  data: Prisma.UserUncheckedUpdateInput
): Promise<CleanUser | void> => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  // Only ADMIN can update every where
  const userId = session.user.role !== UserRole.ADMIN ? session.user.id : id;

  if ('preferences' in data) {
    const currentUser = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        preferences: true,
      },
    });

    // Currently Prisma doesn't support partial update on JSON
    data.preferences = deepmerge(
      currentUser.preferences as Prisma.JsonObject,
      data.preferences as Prisma.JsonObject
    );
  }

  const response = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });

  return exclude(response, 'password');
};

export const createUser = async (
  inputData: Prisma.UserCreateInput
): Promise<CleanUser | void> => {
  const totalUser = await prisma.user.count();

  const found = await prisma.user.findFirst({
    where: { email: inputData.email },
  });

  if (found) {
    throw new Error('User already exists');
  }

  const result = await prisma.user.create({
    data: {
      ...inputData,
      password: await hash(inputData.password),
      role: totalUser === 0 ? UserRole.ADMIN : UserRole.USER,
    },
  });

  return exclude(result, 'password');
};

export const deleteUser = async (id: string): Promise<CleanUser | void> => {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const response = await prisma.user.delete({
    where: {
      // Only ADMIN can delete every where
      id: session.user.role !== UserRole.ADMIN ? session.user.id : id,
    },
  });

  return exclude(response, 'password');
};
export const getConfirmCode = async () => {
  const code = await hash(uuidv5(process.env.NEXTAUTH_SECRET ?? '', uudv4()));
  return Date.now() + ':' + code.replace(/\+/g, '');
};

export const verifyResetPassword = async (
  email: string = '',
  newPassword: string = '',
  confirmCode: string = ''
) => {
  if (email.trim() && newPassword.trim() && confirmCode.trim()) {
    try {
      const data = await prisma.user.update({
        where: {
          confirmCode,
          email,
        },
        data: {
          password: newPassword,
          confirmCode: '',
        },
      });

      if (data) {
        return {
          data: exclude(data, 'password'),
          status: 200,
          description: 'Successfully',
        };
      }
    } catch (error) {
      throw error;
    }
  }
  return {
    data: undefined,
    status: 404,
    description:
      'User Not Found! Please check your email, new password and confirmCode',
  };
};
