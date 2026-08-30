import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
const geist=Geist({variable:'--font-geist-sans',subsets:['latin']});
export const metadata:Metadata={title:'Saberio · Educação que aproxima',description:'O sistema escolar que conecta gestão, pedagogia e famílias.',metadataBase:new URL('https://saberio.vercel.app'),openGraph:{title:'Saberio · Educação que aproxima',description:'Mais tempo para ensinar. Mais leveza para gerir.',type:'website'},twitter:{card:'summary_large_image',title:'Saberio · Educação que aproxima',description:'Mais tempo para ensinar. Mais leveza para gerir.'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body className={`${geist.variable} antialiased`}>{children}</body></html>}
