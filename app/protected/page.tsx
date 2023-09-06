'use client';
import { GeneralLayout, AccessDenied } from '@/components';
import { useAuth } from '@/hooks';

export default function ProtectedPage() {
  const { isAuthenticated } = useAuth();

  // If session exists, display content
  return (
    <GeneralLayout>
      {isAuthenticated ? <h1>Protected Page</h1> : <AccessDenied />}
    </GeneralLayout>
  );
}
