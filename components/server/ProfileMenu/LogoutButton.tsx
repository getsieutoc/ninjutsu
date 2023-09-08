'use client';

import { MenuItem } from '@/components/chakra';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
  return (
    <MenuItem
      onClick={(e) => {
        e.preventDefault();
        signOut();
      }}
    >
      Sign Out
    </MenuItem>
  );
};
