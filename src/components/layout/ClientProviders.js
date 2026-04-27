'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import GlobalLoader from '@/components/common/GlobalLoader';

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <GlobalLoader />
      {children}
    </AuthProvider>
  );
}

