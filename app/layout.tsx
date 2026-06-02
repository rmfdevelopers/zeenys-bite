import { Oswald, Sora } from 'next/font/google';
import './globals.css';

const heading = Oswald({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading' 
});

const body = Sora({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600', '800'],
  variable: '--font-body' 
});

export const metadata = {
  title: "Zeeny's Bite | Enugu's Premier Catering",
  description: "The best bite for every occasion. Authentic smoky jollof, signature grills, and luxury small chops in Enugu.",
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