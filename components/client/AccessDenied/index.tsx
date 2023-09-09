'use client';

import { signIn } from 'next-auth/react';
import { NextLink } from '../NextLink';

export const AccessDenied = () => {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <NextLink
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          You must be signed in to view this page
        </NextLink>
      </p>
    </>
  );
};
