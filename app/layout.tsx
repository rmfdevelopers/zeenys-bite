import './globals.css';
import { Playfair_Display, Outfit } from 'next/font/google';
const h = Playfair_Display({ subsets: ['latin'], variable: '--font-h' });
const b = Outfit({ subsets: ['latin'], variable: '--font-b' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${h.variable} ${b.variable}`}>
      <body>{children}</body>
    </html>
  );
}