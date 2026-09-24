import type { Metadata, Viewport } from 'next';
import { Baloo_2, Nunito_Sans } from 'next/font/google';
import { siteUrl } from '@/lib/site';
import './globals.css';

const baloo = Baloo_2({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-baloo',
});

const nunito = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

const title = 'Saberio | Sistema de Gestão Escolar e Agenda Digital';
const description =
  'Gestão escolar, financeiro, agenda digital e comunicação com famílias em um só sistema. Conheça o Saberio, veja as telas e escolha o plano da sua escola.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | Saberio' },
  description,
  applicationName: 'Saberio',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Saberio',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      {
        url: '/opengraph-image',
        alt: 'Saberio: sistema de gestão escolar e agenda digital',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#f8fbff',
  colorScheme: 'light',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Saberio',
      legalName: 'Vco Consultoria LTDA',
      url: siteUrl,
      logo: `${siteUrl}/saberio-logo-v3.png`,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Saberio',
      url: siteUrl,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#software`,
      name: 'Saberio',
      url: siteUrl,
      description,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      inLanguage: 'pt-BR',
      image: `${siteUrl}/screens-admin.png`,
      featureList: [
        'Gestão escolar',
        'Gestão financeira',
        'Agenda digital',
        'Comunicação com famílias',
      ],
      publisher: { '@id': `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${baloo.variable} ${nunito.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  );
}
