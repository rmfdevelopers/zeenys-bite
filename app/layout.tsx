import './globals.css';
import { Oswald, Sora } from 'next/font/google';
const h = Oswald({ subsets: ['latin'], variable: '--font-h' });
const b = Sora({ subsets: ['latin'], variable: '--font-b' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${h.variable} ${b.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}