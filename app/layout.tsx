import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster } from '@/components/ui/sonner';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Ensure consistent font loading
  variable: '--font-inter', // Optional: use CSS variables
});

export const metadata: Metadata = {
  title: 'Dashboard App',
  description: 'A modern dashboard application for managing posts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}