import type { Metadata } from 'next';
import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Light of Love — Editorial Wedding Photography Studio',
  description:
    'Interactive editorial wedding photography monograph and portfolio for Light of Love (@light_of_love__), showcasing timeless ceremonies, intimate elopements, and 35mm analog stories.',
  openGraph: {
    title: 'Light of Love — Editorial Wedding Photography Studio',
    description:
      'Interactive editorial wedding photography monograph and portfolio for Light of Love (@light_of_love__), showcasing timeless ceremonies, intimate elopements, and 35mm analog stories.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Light of Love — Editorial Wedding Photography Studio',
    description:
      'Interactive editorial wedding photography monograph and portfolio for Light of Love (@light_of_love__), showcasing timeless ceremonies, intimate elopements, and 35mm analog stories.',
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
