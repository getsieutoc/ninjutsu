import { default as argon2 } from 'argon2';

if (!process.env.ARGON_SECRET) {
  throw new Error('ARGON_SECRET variable is not defined');
}

const argonSecret = process.env.ARGON_SECRET;

const defaultOptions = {
  hashLength: 64,
  timeCost: 4,
};

export const hash = async (rawPassword: string): Promise<string | never> => {
  try {
    const secret = Buffer.from(argonSecret);

    return await argon2.hash(rawPassword, { ...defaultOptions, secret });
  } catch (error) {
    throw new Error('Failed to hash password', { cause: error });
  }
};

export const verify = async (
  raw: string,
  hashed: string | null | undefined
): Promise<boolean | never> => {
  try {
    if (!hashed) return false;

    const secret = Buffer.from(argonSecret);

    return await argon2.verify(hashed, raw, { ...defaultOptions, secret });
  } catch (error) {
    throw new Error('Failed to verify password', { cause: error });
  }
};
