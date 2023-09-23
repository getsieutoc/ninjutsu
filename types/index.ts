import { getDictionary } from '@/utils/dictionary';
import { i18n } from '@/configs/i18n.config';

import { Prisma } from '@prisma/client';
export * from '@prisma/client';

export type JsonObject = Prisma.JsonObject;
export type JsonValue = Prisma.JsonValue;

export type { Metadata, ResolvingMetadata } from 'next';
export type { FC, ReactNode, ChangeEvent } from 'react';

export type { PageWithPayload } from '@/services/pages';
export type { UserWithPayload } from '@/services/users';

export enum HttpMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

export type Locale = (typeof i18n)['locales'][number]['value'];

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends Record<string, unknown>
    ? RecursivePartial<T[P]>
    : T[P];
};
