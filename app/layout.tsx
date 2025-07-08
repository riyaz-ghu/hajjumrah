import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Smartlook from './components/Smartlook';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gohajjumrah',
  description: 'Compare verified Hajj and Umrah package providers in your city. Get the best deals on packages starting from ₹75,000.',
  keywords: 'umrah, umrah packages, package umrah, umrah visa',
  icons: 'https://nawhsuonnaovrbijiqqv.supabase.co/storage/v1/object/public/gohajjumrah/kaaba.png',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=AW-16817758944`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16817758944');
          `}
        </Script>
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
        >
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '936294635269444');
            fbq('track', 'PageView');
          `}
        </Script>
        <Smartlook />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}