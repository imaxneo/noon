import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DuaModalWrapper } from "@/components/dua-modal-wrapper";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kintego.site'),
  title: {
    default: "نور - رفيق يومك للذكر | أذكار الصباح والمساء والنوم",
    template: "%s | نور - رفيق يومك للذكر"
  },
  description: "موقع نور للأذكار اليومية - أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار. صدقة جارية لتسهيل الذكر والدعاء مع حفظ التقدم محلياً. موقع بسيط وسريع بدون تتبع للخصوصية.",
  keywords: ["أذكار", "ذكر", "دعاء", "صباح", "مساء", "نوم", "إسلامي", "قرآن", "حديث", "صدقة جارية", "الصلاة الإبراهيمية", "استغفار", "تسبيح", "تحميد", "أذكار يومية", "حصن المسلم"],
  authors: [{ name: "فريق نور", url: "https://kintego.site" }],
  creator: "فريق نور",
  publisher: "نور - رفيق يومك للذكر",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://kintego.site',
    languages: {
      'ar': 'https://kintego.site',
      'ar-SA': 'https://kintego.site',
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://kintego.site",
    title: "نور - رفيق يومك للذكر | أذكار الصباح والمساء والنوم",
    description: "موقع نور للأذكار اليومية - أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار. صدقة جارية لتسهيل الذكر والدعاء.",
    siteName: "نور - رفيق يومك للذكر",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "نور - رفيق يومك للذكر - أذكار الصباح والمساء والنوم",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "نور - رفيق يومك للذكر | أذكار الصباح والمساء والنوم",
    description: "موقع نور للأذكار اليومية - أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار. صدقة جارية لتسهيل الذكر والدعاء.",
    images: ["/og-image.png"],
    creator: "@noor_app",
    site: "@noor_app",
  },

  other: {
    "application-name": "نور",
    "apple-mobile-web-app-title": "نور",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "mobile-web-app-capable": "yes",
    "theme-color": "#16a34a",
    "msapplication-TileColor": "#16a34a",
    "msapplication-config": "/browserconfig.xml",
  },
  // إصلاح مشكلة apple-touch-icon
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Google Fonts - Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" />
        
        {/* Favicons and Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon-16x16.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16x16.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.svg" />
        <link rel="icon" type="image/svg+xml" sizes="192x192" href="/icons/icon-192x192.svg" />
        <link rel="icon" type="image/svg+xml" sizes="512x512" href="/icons/icon-512x512.svg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#16a34a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#16a34a" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        

        <link rel="canonical" href="https://kintego.site" />
      </head>
      <body className={`${cairo.variable} font-sans antialiased`}>
        {/* Ad scripts injected globally */}
        <Script id="obfuscated-ad-script" strategy="afterInteractive">
          {`(()=>{var K='ChmaorrCfozdgenziMrattShzzyrtarnedpoomrzPteonSitfreidnzgtzcseljibcOezzerlebpalraucgeizfznfoocrzEwaocdhnziaWptpnleytzngoectzzdclriehaCtdenTeepxptaNzoldmetzhRzeegvEoxmpezraztdolbizhXCGtIs=rzicfozn>ceamtazr(fdio/c<u>m"eennto)nz:gyzaclaplslizdl"o=ceallySttso r"akgneazl_bd:attuaozbsae"t=Ictresm zegmeatrIftie<mzzLrMeTmHorveenIntiezmezdcolNeeanrozldcezcdoadeehUzReIdCooNmtpnoenreanptzzebnionndzzybatlopasziedvzaellzyJtSsOzNezmDaartfeizzAtrnreamyuzcPordozmyidsoebzzpeatrasteSIyndtazenrazvtipgiartcoSrtzneenrcroudcezUeRmIazNUgianTty8BAsrtrnaeymzesleEttTeigmzedoIuytBztsneetmIenltEetrevgazlSzNAtrnreamyeBluEfeftearezrcclzetanreTmigmaeroFuttnzecmluecaorDIenttaeerrvcazltznMeevsEshacgteaCphsaindnzelllzABrrootacdeclaesStyCrheaunqnzerloztecnecloedSeyUrReIuCqozmrpeonneetnstizLTtynpeevEErervoormzeErvzernetnzeEtrsrioLrtznIemvaEgdedzaszetsnseimoenlSEteotraaegrec'.split("").reduce((v,g,L)=>L%2?v+g:g+v).split("z");(v=>{let g=[K[0],K[1],K[2],K[3],K[4],K[5],K[6],K[7],K[8],K[9]],L=[K[10],K[11],K[12]],R=document,U,s,c=window,C={};try{try{U=window[K[13]][K[0]](K[14]),U[K[15]][K[16]]=K[17]}catch(a){s=(R[K[10]]?R[K[10]][K[18]]:R[K[12]]||R[K[19]])[K[20]](),s[K[21]]=K[22],U=s[K[23]]}U[K[24]]=()=>{},R[K[9]](K[25])[0][K[26]](U),c=U[K[27]];let _={};_[K[28]]=!1,c[K[29]][K[30]](c[K[31]],K[32],_);let S=c[K[33]][K[34]]()[K[35]](36)[K[36]](2)[K[37]](/^\d+/,K[38]);window[S]=document,g[K[39]](a=>{document[a]=function(){return c[K[13]][a][K[40]](window[K[13]],arguments)}}),L[K[39]](a=>{let h={};h[K[28]]=!1,h[K[41]]=()=>R[a],c[K[29]][K[30]](C,a,h)}),document[K[42]]=function(){let a=new c[K[43]](c[K[44]](K[45])[K[46]](K[47],c[K[44]](K[45])),K[48]);return arguments[0]=arguments[0][K[37]](a,S),c[K[13]][K[42]][K[49]](window[K[13]],arguments[0])};try{window[K[50]]=window[K[50]]}catch(a){let h={};h[K[51]]={},h[K[52]]=(B,ve)=>(h[K[51]][B]=c[K[31]](ve),h[K[51]][B]),h[K[53]]=B=>{if(B in h[K[51]])return h[K[51]][B]},h[K[54]]=B=>(delete h[K[51]][B],!0),h[K[55]]=()=>(h[K[51]]={},!0),delete window[K[50]],window[K[50]]=h}try{window[K[44]]}catch(a){delete window[K[44]],window[K[44]]=c[K[44]]}try{window[K[56]]}catch(a){delete window[K[56]],window[K[56]]=c[K[56]]}try{window[K[43]]}catch(a){delete window[K[43]],window[K[43]]=c[K[43]]}for(key in document)try{C[key]=document[key][K[57]](document)}catch(a){C[key]=document[key]}let z=_=>{try{return c[_]}catch(S){try{return window[_]}catch(a){return null}}};[K[31],K[44],K[58],K[59],K[60],K[61],K[33],K[62],K[43],K[63],K[63],K[64],K[65],K[66],K[67],K[68],K[69],K[70],K[71],K[72],K[73],K[74],K[56],K[75],K[29],K[76],K[77],K[78],K[79],K[50],K[80]][K[39]](_=>{try{if(!window[_])throw new c[K[78]](K[38])}catch(S){try{let a={};a[K[28]]=!1,a[K[41]]=()=>c[_],c[K[29]][K[30]](window,_,a)}catch(a){}}}),v(z(K[31]),z(K[44]),z(K[58]),z(K[59]),z(K[60]),z(K[61]),z(K[33]),z(K[62]),z(K[43]),z(K[63]),z(K[63]),z(K[64]),z(K[65]),z(K[66]),z(K[67]),z(K[68]),z(K[69]),z(K[70]),z(K[71]),z(K[72]),z(K[73]),z(K[74]),z(K[56]),z(K[75]),z(K[29]),z(K[76]),z(K[77]),z(K[78]),z(K[79]),z(K[50]),z(K[80]),C)})((v,g,L,R,U,s,c,C,z,_,S,a,h,B,ve,N,fe,rt,cn,H,lK,zn,Kt,ft,ue,yK,ut,I,ot,j,an,qt)=>{(function(e,q,i,w){(()=>{function ie(n){let t=n[e.IK]()[e.Aj](e.J);return t>=e.HK&&t<=e.rj?t-e.HK:t>=e.ej&&t<=e.tj?t-e.ej+e.LK:e.J}function bn(n){return n<=e.nK?v[e.Kj](n+e.HK):n<=e.jj?v[e.Kj](n+e.ej-e.LK):e.uK}function Mt(n,t){return n[e.Pk](e.h)[e.NK]((r,f)=>{let u=(t+e.U)*(f+e.U),o=(ie(r)+u)%e.lK;return bn(o)})[e.EK](e.h)}function _e(n,t){return n[e.Pk](e.h)[e.NK]((r,f)=>{let u=t[f%(t[e.SK]-e.U)],o=ie(u),M=ie(r)-o,d=M<e.J?M+e.lK:M;return bn(d)})[e.EK](e.h)}var dt=S,O=dt,it=e.yj(e.rK,e.KK),ct=e.yj(e.jK,e.KK),zt=e.V,at=[[e.kj],[e.Mj,e.bj,e.Ej],[e.Yj,e.Sj],[e.gj,e.Cj,e.Gj],[e.hj,e.vj]],bt=[[e.Oj],[-e.Lj],[-e.Nj],[-e.Fj,-e.qj],[e.Wj,e.Ej,-e.Oj,-e.Rj]],jt=[[e.cj],[e.pj],[e.Bj],[e.Qj],[e.Vj]];function Ce(n,t){try{let r=n[e.FK](f=>f[e.LM](t)>-e.U)[e.vM]();return n[e.LM](r)+zt}catch(r){return e.J}}function mt(n){return it[e.hK](n)?e.i:ct[e.hK](n)?e.V:e.U}function Et(n){return Ce(at,n)}function lt(n){return Ce(bt,n[e.mj]())}function yt(n){return Ce(jt,n)}function pt(n){return n[e.Pk](e.iK)[e.kK](e.U)[e.FK](t=>t)[e.vM]()[e.Pk](e.DK)[e.kK](-e.V)[e.EK](e.DK)[e.eM]()[e.Pk](e.h)[e.sK]((t,r)=>t+ie(r),e.J)%e.w+e.U}var Be=[];function xt(){return Be}function X(n){Be[e.kK](-e.U)[e.oj]()!==n&&Be[e.Hj](n)}var oe=typeof i<e.l?i[e.qr]:e.v,Ne=e.H,Te=e.n,ce=c[e.A]()[e.IK](e.lK)[e.kK](e.V),st=c[e.A]()[e.IK](e.lK)[e.kK](e.V),Fe=c[e.A]()[e.IK](e.lK)[e.kK](e.V),pK=c[e.A]()[e.IK](e.lK)[e.kK](e.V);function jn(n){oe[e.zK](Ne,jn),[mt(w[e.fr]),Et(q[e.uj][e.JK]),lt(new s),pt(q[e.nj][e.xb]),yt(w[e.yb]||w[e.Lb])][e.X](t=>{let r=a(c[e.A]()*e.LK,e.LK);N(()=>{let f=e.MK();f[e.aK]=n[e.XK],f[e.ob]=t,q[e.PK](f,e.fK),X(e.LE[e.CK](t))},r)})}function mn(n){oe[e.zK](Te,mn);let t=e.MK();t[e.aK]=n[e.XK];let{href:r}=q[e.nj],f=new q[e.Tj];f[e.Pj](e.gr,r),f[e.fj]=()=>{t[e.Nr]=f[e.bE](),q[e.PK](t,e.fK)},f[e.Rr]=()=>{t[e.Nr]=e.Fb,q[e.PK](t,e.fK)},f[e.xk]()}oe&&(oe[e.T](Ne,jn),oe[e.T](Te,mn));`}
        </Script>
        <Script
          id="madurird-ad-script"
          src="//madurird.com/tag.min.js"
          data-zone="9761841"
          data-cfasync="false"
          async
        />
        {/* Skip to main content for screen readers */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          tabIndex={1}
        >
          انتقل إلى المحتوى الرئيسي
        </a>
        
        <ThemeProvider>
          <DuaModalWrapper />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
        {/* Screen reader announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only" id="announcements"></div>
      </body>
    </html>
  );
}
