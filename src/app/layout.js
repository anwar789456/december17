import './globals.css';
import Image from 'next/image';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Samet Home</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=0"
        />
        <meta
          name="description"
          content="Samet Home - Discover high-quality furniture and decor for your home. Stylish and modern designs await you!"
        />
        <meta name="facebook-domain-verification" content="g6rsp2k9pbldyeoxl4v0n600ohsfx3" />
        <link rel="stylesheet" href="/globals.css" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2303078989777156');
              fbq('track', 'PageView');
            `,
          }}
        ></script>
        <noscript>
          <Image
            height={1}
            width={1}
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2303078989777156&ev=PageView&noscript=1"
            alt="Samet Home"
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* Google Analytics Code */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HW46G6SLH8"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HW46G6SLH8');
            `,
          }}
        ></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
