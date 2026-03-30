// src/app/layout.js
import { AuthProvider } from '@/components/providers/AuthProvider';
import AuthModal from '@/components/auth/AuthModal';
import './globals.css';

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
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8031704055036556"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}