import { Oswald, Sora } from 'next/font/google';
import './globals.css';

const heading = Oswald({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-heading' 
});

const body = Sora({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'],
  variable: '--font-body' 
});

export const metadata = {
  title: "Zeeny's Bite | Premium Catering Enugu",
  description: "Authentic smoky jollof and gourmet catering for events in Enugu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}