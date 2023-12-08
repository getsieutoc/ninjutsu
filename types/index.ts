import { Prisma } from '@prisma/client';

export type * from '@prisma/client';

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

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends Record<string, unknown>
      ? RecursivePartial<T[P]>
      : T[P];
};

export type NestedKeyOf<T extends object> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`;
}[keyof T & (string | number)];
