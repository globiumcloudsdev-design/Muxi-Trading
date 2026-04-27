import { Inter } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/layout/ClientProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MUXI Trading - Wholesale Simplified',
  description: 'MUXI Trading supplies verified wholesale inventory for distributors, retailers, and institutional buyers.',
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
    apple: '/images/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
