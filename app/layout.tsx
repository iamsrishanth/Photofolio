import type { Metadata } from 'next';
import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Light of Love — Editorial Wedding Photography Studio',
  description:
    'Interactive wedding & events photography portfolio for Light of Love (@light_of_love__), showcasing Christian weddings, couple shoots, Haldi celebrations, bridal portraits, and saree ceremonies in Hyderabad and Beyond.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Light of Love — Editorial Wedding Photography Studio',
    description:
      'Interactive wedding & events photography portfolio for Light of Love (@light_of_love__), showcasing Christian weddings, couple shoots, Haldi celebrations, bridal portraits, and saree ceremonies in Hyderabad and Beyond.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Light of Love — Editorial Wedding Photography Studio',
    description:
      'Interactive wedding & events photography portfolio for Light of Love (@light_of_love__), showcasing Christian weddings, couple shoots, Haldi celebrations, bridal portraits, and saree ceremonies in Hyderabad and Beyond.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans bg-[#FAF8F5] text-[#141413] antialiased selection:bg-[#141413] selection:text-[#FAF8F5]"
      >
        {children}
      </body>
    </html>
  );
}
