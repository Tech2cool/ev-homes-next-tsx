// components/AuthInit.tsx
'use client';
import { useEffect } from 'react';
import { useUser } from '@/providers/userContext';

export default function AuthInit({ user }: { user: any }) {
  const { updateUser } = useUser();

  useEffect(() => {
    updateUser(user);
  }, [user, updateUser]);

  return null;
}
