import './globals.css';
import {
  Cormorant_Garamond,
  EB_Garamond,
  Caveat,
  Inter,
} from 'next/font/google';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const hand = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-hand',
  display: 'swap',
});

const ui = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ui',
  display: 'swap',
});

export const metadata = {
  title: 'Diário de Nós',
  description: 'Um diário de relacionamento — feito à mão, página por página.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Diário de Nós 💛',
    description: 'Abra e folheie — tem algo especial pra você aqui.',
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport = {
  themeColor: '#3f2a1e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${hand.variable} ${ui.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
