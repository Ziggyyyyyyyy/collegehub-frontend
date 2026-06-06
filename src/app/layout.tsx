import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CompareDrawer } from '@/components/compare/compare-drawer';
import { ToastProvider } from '@/components/ui/toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'CollegeHub - Find Your Perfect College',
  description: 'Discover, compare, and save the best colleges in India',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ToastProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CompareDrawer />
        </ToastProvider>
      </body>
    </html>
  );
}
