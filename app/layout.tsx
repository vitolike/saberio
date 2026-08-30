import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Saberio · Sistema de Gestão Escolar',
  description: 'O sistema escolar que conecta gestão, berçário, financeiro, pedagogia e famílias.',
  metadataBase: new URL('https://saberio.vercel.app'),
  openGraph: {
    title: 'Saberio · Educação que aproxima',
    description: 'Mais tempo para ensinar. Mais leveza para gerir.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saberio · Educação que aproxima',
    description: 'Mais tempo para ensinar. Mais leveza para gerir.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800;900&family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
