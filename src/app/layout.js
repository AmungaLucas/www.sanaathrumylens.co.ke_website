// src/app/layout.js
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { AuthProvider } from '@/components/providers/AuthProvider';
import AuthModal from '@/components/auth/AuthModal';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: "Sanaa Thru My Lens - Kenya's Creative Ecosystem",
  description: "Exploring architecture, design, urbanism, and creative culture in Kenya",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://sanaathrumylens.co.ke'),
  verification: {
    google: 'ca-pub-8031704055036556',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
          <AuthModal />
        </AuthProvider>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8031704055036556"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
