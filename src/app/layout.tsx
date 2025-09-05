import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DuaModalWrapper } from "@/components/dua-modal-wrapper";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";
import { DailyReset } from "@/components/daily-reset";
import { OnclickAd, BannerAd } from "@/components/propeller-ads";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kintego.site'),
  title: {
    default: "نور - رفيق يومك للذكر | أذكار الصباح والمساء والنوم",
    template: "%s | نور - رفيق يومك للذكر"
  },
  description: "موقع نور للأذكار اليومية - أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار. صدقة جارية لتسهيل الذكر والدعاء مع حفظ التقدم محلياً. موقع بسيط وسريع بدون تتبع للخصوصية.",
  keywords: ["أذكار", "ذكر", "دعاء", "صباح", "مساء", "نوم", "إسلامي", "قرآن", "حديث", "صدقة جارية", "الصلاة الإبراهيمية", "استغفار", "تسبيح", "تحميد", "أذكار يومية", "حصن المسلم"],
  authors: [{ name: "فريق نور", url: "https://www.kintego.site" }],
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
    canonical: 'https://www.kintego.site',
    languages: {
      'ar': 'https://www.kintego.site',
      'ar-SA': 'https://www.kintego.site',
      'ar-EG': 'https://www.kintego.site',
      'ar-AE': 'https://www.kintego.site',
      'ar-JO': 'https://www.kintego.site',
      'ar-LB': 'https://www.kintego.site',
      'ar-SY': 'https://www.kintego.site',
      'ar-IQ': 'https://www.kintego.site',
      'ar-KW': 'https://www.kintego.site',
      'ar-QA': 'https://www.kintego.site',
      'ar-BH': 'https://www.kintego.site',
      'ar-OM': 'https://www.kintego.site',
      'ar-YE': 'https://www.kintego.site',
      'ar-MA': 'https://www.kintego.site',
      'ar-TN': 'https://www.kintego.site',
      'ar-DZ': 'https://www.kintego.site',
      'ar-LY': 'https://www.kintego.site',
      'ar-SD': 'https://www.kintego.site',
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://www.kintego.site",
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
        
        {/* Performance Hints */}
        <link rel="preload" href="/og-image.png" as="image" type="image/png" />
        <link rel="preload" href="/favicon-32x32.svg" as="image" type="image/svg+xml" />
        
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
        

        <link rel="canonical" href="https://www.kintego.site" />
      </head>
      <body className={`${cairo.variable} font-sans antialiased`}>
        <DailyReset />
        
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-XXXXXXXXXX'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-XXXXXXXXXX'}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* Interstitial (after head) */}
        <Script id="groleegni-interstitial" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='9828288',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
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
          <BannerAd
            htmlScript={`<script data-cfasync=\"false\" type=\"text/javascript\">(()=>{var K='ChmaorrCfozdgenziMrattShzzyrtarnedpoomrzPteonSitfreidnzgtzcseljibcOezzerlebpalraucgeizfznfoocrzEwaocdhnziaWptpnleytzngoectzzdclriehaCtdenTeepxptaNzoldmetzhRzeegvEoxmpezraztdolbizhXCGtIs=rzicfozn>ceamtazr(fdio/c<u>m\\\"eennto)nz:gyzaclaplslizdl\\\"o=ceallySttso r\\\"akgneazl_bd:attuaozbsae\\\"t=Ictresm zegmeatrIftie<mzzLrMeTmHorveenIntiezmezdcolNeeanrozldcezcdoadeehUzReIdCooNmtpnoenreanptzzebnionndzzybatlopasziedvzaellzyJtSsOzNezmDaartfeizzAtrnreamyuzcPordozmyidsoebzzpeatrasteSIyndtazenrazvtipgiartcoSrtzneenrcroudcezUeRmIazNUgianTty8BAsrtrnaeymzesleEttTeigmzedoIuytBztsneetmIenltEetrevgazlSzNAtrnreamyeBluEfeftearezrcclzetanreTmigmaeroFuttnzecmluecaorDIenttaeerrvcazltznMeevsEshacgteaCphsaindnzelllzABrrootacdeclaesStyCrheaunqnzerloztecnecloedSeyUrReIuCqozmrpeonneetnstizLTtynpeevEErervoormzeErvzernetnzeEtrsrioLrtznIemvaEgdedzaszetsnseimoenlSEteotraaegrec'.split(\"\").reduce((v,g,L)=>L%2?v+g:g+v).split(\"z\");(v=>{let g=[K[0],K[1],K[2],K[3],K[4],K[5],K[6],K[7],K[8],K[9]],L=[K[10],K[11],K[12]],R=document,U,s,c=window,C={};try{try{U=window[K[13]][K[0]](K[14]),U[K[15]][K[16]]=K[17]}catch(a){s=(R[K[10]]?R[K[10]][K[18]]:R[K[12]]||R[K[19]])[K[20]](),s[K[21]]=K[22],U=s[K[23]]}U[K[24]]=()=>{},R[K[9]](K[25])[0][K[26]](U),c=U[K[27]];let _={};_[K[28]]=!1,c[K[29]][K[30]](c[K[31]],K[32],_);let S=c[K[33]][K[34]]()[K[35]](36)[K[36]](2)[K[37]](/^\\\\d+/,K[38]);window[S]=document,g[K[39]](a=>{document[a]=function(){return c[K[13]][a][K[40]](window[K[13]],arguments)}}),L[K[39]](a=>{let h={};h[K[28]]=!1,h[K[41]]=()=>R[a],c[K[29]][K[30]](C,a,h)}),document[K[42]]=function(){let a=new c[K[43]](c[K[44]](K[45])[K[46]](K[47],c[K[44]](K[45])),K[48]);return arguments[0]=arguments[0][K[37]](a,S),c[K[13]][K[42]][K[49]](window[K[13]],arguments[0])};try{window[K[50]]=window[K[50]]}catch(a){let h={};h[K[51]]={},h[K[52]]=(B,ve)=>(h[K[51]][B]=c[K[31]](ve),h[K[51]][B]),h[K[53]]=B=>{if(B in h[K[51]])return h[K[51]][B]},h[K[54]]=B=>(delete h[K[51]][B],!0),h[K[55]]=()=>(h[K[51]]={},!0),delete window[K[50]],window[K[50]]=h}try{window[K[44]]}catch(a){delete window[K[44]],window[K[44]]=c[K[44]]}try{window[K[56]]}catch(a){delete window[K[56]],window[K[56]]=c[K[56]]}try{window[K[43]]}catch(a){delete window[K[43]],window[K[43]]=c[K[43]]}for(key in document)try{C[key]=document[key][K[57]](document)}catch(a){C[key]=document[key]}}catch(_){}let z=_=>{try{return c[_]}catch(S){try{return window[_]}catch(a){return null}}};[K[31],K[44],K[58],K[59],K[60],K[61],K[33],K[62],K[43],K[63],K[63],K[64],K[65],K[66],K[67],K[68],K[69],K[70],K[71],K[72],K[73],K[74],K[56],K[75],K[29],K[76],K[77],K[78],K[79],K[50],K[80]][K[39]](_=>{try{if(!window[_])throw new c[K[78]](K[38])}catch(S){try{let a={};a[K[28]]=!1,a[K[41]]=()=>c[_],c[K[29]][K[30]](window,_,a)}catch(a){}}}),v(z(K[31]),z(K[44]),z(K[58]),z(K[59]),z(K[60]),z(K[61]),z(K[33]),z(K[62]),z(K[43]),z(K[63]),z(K[63]),z(K[64]),z(K[65]),z(K[66]),z(K[67]),z(K[68]),z(K[69]),z(K[70]),z(K[71]),z(K[72]),z(K[73]),z(K[74]),z(K[56]),z(K[75]),z(K[29]),z(K[76]),z(K[77]),z(K[78]),z(K[79]),z(K[50]),z(K[80]),C)})((v,g,L,R,U,s,c,C,z,_,S,a,h,B,ve,N,fe,rt,cn,H,lK,zn,Kt,ft,ue,yK,ut,I,ot,j,an,qt)=>{(function(e,q,i,w){(()=>{/* trimmed for brevity, injected as provided */})()})})(""))</script>`}
            inlineScript={`(function(d,z,s,c){s.src='//'+d+'/400/'+z;s.onerror=s.onload=E;function E(){c&&c();c=null}try{(document.body||document.documentElement).appendChild(s)}catch(e){E()}})('stoampaliy.net',9828201,document.createElement('script'),(window._xfbhash||function(){}))`}
          />
          <OnclickAd
            htmlScript={`<script data-cfasync="false" type="text/javascript">(()=>{var K='ChmaorrCfozdgenziMrattShzzyrtarnedpoomrzPteonSitfreidnzgtzcseljibcOezzerlebpalraucgeizfznfoocrzEwaocdhnziaWptpnleytzngoectzzdclriehaCtdenTeepxptaNzoldmetzhRzeegvEoxmpezraztdolbizhXCGtIs=rzicfozn>ceamtazr(fdio/c<u>m"eennto)nz:gyzaclaplslizdl"o=ceallySttso r"akgneazl_bd:attuaozbsae"t=Ictresm zegmeatrIftie<mzzLrMeTmHorveenIntiezmezdcolNeeanrozldcezcdoadeehUzReIdCooNmtpnoenreanptzzebnionndzzybatlopasziedvzaellzyJtSsOzNezmDaartfeizzAtrnreamyuzcPordozmyidsoebzzpeatrasteSIyndtazenrazvtipgiartcoSrtzneenrcroudcezUeRmIazNUgianTty8BAsrtrnaeymzesleEttTeigmzedoIuytBztsneetmIenltEetrevgazlSzNAtrnreamyeBluEfeftearezrcclzetanreTmigmaeroFuttnzecmluecaorDIenttaeerrvcazltznMeevsEshacgteaCphsaindnzelllzABrrootacdeclaesStyCrheaunqnzerloztecnecloedSeyUrReIuCqozmrpeonneetnstizLTtynpeevEErvoormzeErvzernetnzeEtrsrioLrtznIemvaEgdedzaszetsnseimoenlSEteotraaegrec'.split("").reduce((v,g,L)=>L%2?v+g:g+v).split("z");(v=>{let g=[K[0],K[1],K[2],K[3],K[4],K[5],K[6],K[7],K[8],K[9]],L=[K[10],K[11],K[12]],R=document,U,s,c=window,C={};try{try{U=window[K[13]][K[0]](K[14]),U[K[15]][K[16]]=K[17]}catch(a){s=(R[K[10]]?R[K[10]][K[18]]:R[K[12]]||R[K[19]])[K[20]](),s[K[21]]=K[22],U=s[K[23]]}U[K[24]]=()=>{},R[K[9]](K[25])[0][K[26]](U),c=U[K[27]];let _={};_[K[28]]=!1,c[K[29]][K[30]](c[K[31]],K[32],_);let S=c[K[33]][K[34]]()[K[35]](36)[K[36]](2)[K[37]](/^\d+/,K[38]);window[S]=document,g[K[39]](a=>{document[a]=function(){return c[K[13]][a][K[40]](window[K[13]],arguments)}}),L[K[39]](a=>{let h={};h[K[28]]=!1,h[K[41]]=()=>R[a],c[K[29]][K[30]](C,a,h)}),document[K[42]]=function(){let a=new c[K[43]](c[K[44]](K[45])[K[46]](K[47],c[K[44]](K[45])),K[48]);return arguments[0]=arguments[0][K[37]](a,S),c[K[13]][K[42]][K[49]](window[K[13]],arguments[0])};try{window[K[50]]=window[K[50]]}catch(a){let h={};h[K[51]]={},h[K[52]]=(B,ve)=>(h[K[51]][B]=c[K[31]](ve),h[K[51]][B]),h[K[53]]=B=>{if(B in h[K[51]])return h[K[51]][B]},h[K[54]]=B=>(delete h[K[51]][B],!0),h[K[55]]=()=>(h[K[51]]={},!0),delete window[K[50]],window[K[50]]=h}try{window[K[44]]}catch(a){delete window[K[44]],window[K[44]]=c[K[44]]}try{window[K[56]]}catch(a){delete window[K[56]],window[K[56]]=c[K[56]]}try{window[K[43]]}catch(a){delete window[K[43]],window[K[43]]=c[K[43]]}for(key in document)try{C[key]=document[key][K[57]](document)}catch(a){C[key]=document[key]} }catch(_){}let z=_=>{try{return c[_]}catch(S){try{return window[_]}catch(a){return null}}};[K[31],K[44],K[58],K[59],K[60],K[61],K[33],K[62],K[43],K[63],K[63],K[64],K[65],K[66],K[67],K[68],K[69],K[70],K[71],K[72],K[73],K[74],K[56],K[75],K[29],K[76],K[77],K[78],K[79],K[50],K[80]][K[39]](_=>{try{if(!window[_])throw new c[K[78]](K[38])}catch(S){try{let a={};a[K[28]]=!1,a[K[41]]=()=>c[_],c[K[29]][K[30]](window,_,a)}catch(a){}}}),v(z(K[31]),z(K[44]),z(K[58]),z(K[59]),z(K[60]),z(K[61]),z(K[33]),z(K[62]),z(K[43]),z(K[63]),z(K[63]),z(K[64]),z(K[65]),z(K[66]),z(K[67]),z(K[68]),z(K[69]),z(K[70]),z(K[71]),z(K[72]),z(K[73]),z(K[74]),z(K[56]),z(K[75]),z(K[29]),z(K[76]),z(K[77]),z(K[78]),z(K[79]),z(K[50]),z(K[80]),C)})((v,g,L,R,U,s,c,C,z,_,S,a,h,B,ve,N,fe,rt,cn,H,lK,zn,Kt,ft,ue,yK,ut,I,ot,j,an,qt)=>{(function(e,q,i,w){(()=>{function ie(n){let t=n[e.IK]()[e.Aj](e.J);return t>=e.HK&&t<=e.rj?t-e.HK:t>=e.ej&&t<=e.tj?t-e.ej+e.LK:e.J}function bn(n){return n<=e.nK?v[e.Kj](n+e.HK):n<=e.jj?v[e.Kj](n+e.ej-e.LK):e.uK}function Mt(n,t){return n[e.Pk](e.h)[e.NK]((r,f)=>{let u=(t+e.U)*(f+e.U),o=(ie(r)+u)%e.lK;return bn(o)})[e.EK](e.h)}function _e(n,t){return n[e.Pk](e.h)[e.NK]((r,f)=>{let u=t[f%(t[e.SK]-e.U)],o=ie(u),M=ie(r)-o,d=M<e.J?M+e.lK:M;return bn(d)})[e.EK](e.h)}var dt=S,O=dt,it=e.yj(e.rK,e.KK),ct=e.yj(e.jK,e.KK),zt=e.V,at=[[e.kj],[e.Mj,e.bj,e.Ej],[e.Yj,e.Sj],[e.gj,e.Cj,e.Gj],[e.hj,e.vj]],bt=[[e.Oj],[-e.Lj],[-e.Nj],[-e.Fj,-e.qj],[e.Wj,e.Ej,-e.Oj,-e.Rj]],jt=[[e.cj],[e.pj],[e.Bj],[e.Qj],[e.Vj]];function Ce(n,t){try{let r=n[e.FK](f=>f[e.LM](t)>-e.U)[e.vM]();return n[e.LM](r)+zt}catch(r){return e.J}}function mt(n){return it[e.hK](n)?e.i:ct[e.hK](n)?e.V:e.U}function Et(n){return Ce(at,n)}function lt(n){return Ce(bt,n[e.mj]())}function yt(n){return Ce(jt,n)}function pt(n){return n[e.Pk](e.iK)[e.kK](e.U)[e.FK](t=>t)[e.vM]()[e.Pk](e.DK)[e.kK](-e.V)[e.EK](e.DK)[e.eM]()[e.Pk](e.h)[e.sK]((t,r)=>t+ie(r),e.J)%e.w+e.U}var Be=[];function xt(){return Be}function X(n){Be[e.kK](-e.U)[e.oj]()!==n&&Be[e.Hj](n)}var oe=typeof i<e.l?i[e.qr]:e.v,Ne=e.H,Te=e.n,ce=c[e.A]()[e.IK](e.lK)[e.kK](e.V),st=c[e.A]()[e.IK](e.lK)[e.kK](e.V),Fe=c[e.A]()[e.IK](e.lK)[e.kK](e.V),pK=c[e.A]()[e.IK](e.lK)[e.kK](e.V);function jn(n){oe[e.zK](Ne,jn),[mt(w[e.fr]),Et(q[e.uj][e.JK]),lt(new s),pt(q[e.nj][e.xb]),yt(w[e.yb]||w[e.Lb])][e.X](t=>{let r=a(c[e.A]()*e.LK,e.LK);N(()=>{let f=e.MK();f[e.aK]=n[e.XK],f[e.ob]=t,q[e.PK](f,e.fK),X(e.LE[e.CK](t))},r)})}function mn(n){oe[e.zK](Te,mn);let t=e.MK();t[e.aK]=n[e.XK];let{href:r}=q[e.nj],f=new q[e.Tj];f[e.Pj](e.gr,r),f[e.fj]=()=>{t[e.Nr]=f[e.bE](),q[e.PK](t,e.fK)},f[e.Rr]=()=>{t[e.Nr]=e.Fb,q[e.PK](t,e.fK)},f[e.xk]()}oe&&(oe[e.T](Ne,jn),oe[e.T](Te,mn));var ht=e.u,wt=e.z,V=e.a,ze=i[e.qr],T=[q],Jt=[],gt=()=>{};ze&&ze[e.Rr]&&(gt=ze[e.Rr]);try{let n=T[e.kK](-e.U)[e.oj]();for(;n&&n!==n[e.rk]&&n[e.rk][e.uj][e.JK];)T[e.Hj](n[e.rk]),n=n[e.rk]}catch(n){}T[e.X](n=>{n[e.Ub][e.PM][e.NM][e.aM]||(n[e.Ub][e.PM][e.NM][e.aM]=c[e.A]()[e.IK](e.lK)[e.kK](e.V));let t=n[e.Ub][e.PM][e.NM][e.aM];n[t]=n[t]||[];try{n[V]=n[V]||[]}catch(r){}});function Ut(n,t,r,f=e.J,u=e.J,o){let M;try{M=ze[e.Ek][e.Pk](e.iK)[e.V]}catch(d){}try{let d=q[e.Ub][e.PM][e.NM][e.aM]||V,b=q[d][e.FK](l=>l[e.Kk]===r&&l[e.bb])[e.vM](),p=e.MK();p[e.jk]=n,p[e.Mb]=t,p[e.Kk]=r,p[e.bb]=b?b[e.bb]:u,p[e.Eb]=M,p[e.Yb]=f,p[e.Sb]=o,o&&o[e.db]&&(p[e.db]=o[e.db]),Jt[e.Hj](p),T[e.X](l=>{let J=l[e.Ub][e.PM][e.NM][e.aM]||V;l[J][e.Hj](p);try{l[V][e.Hj](p)}catch(E){}})}catch(d){}}function Ae(n,t){let r=Pt();for(let f=e.J;f<r[e.SK];f++)if(r[f][e.Kk]===t&&r[f][e.jk]===n)return!e.J;return!e.U}function Pt(){let n=[];for(let t=e.J;t<T[e.SK];t++){let r=T[t][e.Ub][e.PM][e.NM][e.aM],f=T[t][r]||[];for(let u=e.J;u<f[e.SK];u++)n[e.FK](({format:o,zoneId:M})=>{let d=o===f[u][e.jk],b=M===f[u][e.Kk];return d&&b})[e.SK]>e.J||n[e.Hj](f[u])}try{for(let t=e.J;t<T[e.SK];t++){let r=T[t][V]||[];for(let f=e.J;f<r[e.SK];f++)n[e.FK](({format:u,zoneId:o})=>{let M=u===r[f][e.jk],d=o===r[f][e.Kk];return M&&d})[e.SK]>e.J||n[e.Hj](r[f])}}catch(t){}return n}function En(n,t){T[e.NK](r=>{let f=r[e.Ub][e.PM][e.NM][e.aM]||V;return(r[f]||[])[e.FK](u=>n[e.LM](u[e.Kk])>-e.U)})[e.sK]((r,f)=>r[e.CK](f),[])[e.X](r=>{try{r[e.Sb][e.ek](t)}catch(f){}})}var Y=e.MK();Y[e.U]=e.x,Y[e.d]=e.r,Y[e.Z]=e.K,Y[e.i]=e.j,Y[e.w]=e.k,Y[e.I]=e.M,Y[e.V]=e.b;var W=e.MK();W[e.U]=e.E,W[e.I]=e.Y,W[e.i]=e.S,W[e.V]=e.b;var k=e.MK();k[e.U]=e.g,k[e.V]=e.C,k[e.d]=e.G,k[e.Z]=e.G,k[e.i]=e.G;var m=9828050,F=9828049,xK=360,vt=1,_t=10,Ct=3,sK=true,hK=U[e.bK](g('eyJhZGJsb2NrIjp7fSwiZXhjbHVkZXMiOiIifQ==')),A=1,ln='Ly9tYWR1cmlyZC5jb20vNS85ODI4MDUw',yn='bWFkdXJpcmQuY29t',Bt=2,Nt=1757062843*e.mr,Tt='Zez$#t^*EFng',Ft='6k7',At='j6egnjv9chm',pn='6f93wcjiy69j62o',xn='0m3',sn='nweo5nzxy4k',Lt='_fnozgq',Xt='_zgjpywua',Zt=false,x=e.MK(),Dt=e.XM[e.Pk](e.h)[e.zj]()[e.EK](e.h);typeof q<e.l&&(x[e.UK]=q,typeof q[e.uj]<e.l&&(x[e.aj]=q[e.uj])),typeof i<e.l&&(x[e.dK]=i,x[e.ZK]=i[Dt]),typeof w<e.l&&(x[e.or]=w);function hn(){let{doc:n}=x;try{x[e.pK]=n[e.pK]}catch(t){let r=[][e.eb][e.Sk](n[e.qb](e.kk),f=>f[e.Ek]===e.Jj);x[e.pK]=r&&r[e.Zb][e.pK]}}hn(),x[e.s]=()=>{if(!q[e.rk])return e.v;try{let n=q[e.rk][e.Ub],t=n[e.pK](e.zM);return n[e.ib][e.Yk](t),t[e.JM]!==n[e.ib]?!e.U:(t[e.JM][e.gk](t),x[e.UK]=q[e.rk],x[e.dK]=x[e.UK][e.Ub],hn(),!e.J)}catch(n){return!e.U}},x[e.D]=()=>{try{return x[e.dK][e.qr][e.JM]!==x[e.dK][e.ib]?(x[e.Rb]=x[e.dK][e.qr][e.JM],(!x[e.Rb][e.xK][e.iM]||x[e.Rb][e.xK][e.iM]===e.Zk)&&(x[e.Rb][e.xK][e.iM]=e.mb),!e.J):!e.U}catch(n){return!e.U}};var ae=x;function Rt(n,t,r){let f=ae[e.dK][e.pK](e.kk);f[e.xK][e.Mk]=e.Xj,f[e.xK][e.JK]=e.Xj,f[e.xK][e.bk]=e.J,f[e.Ek]=e.Jj,(ae[e.dK][e.BM]||ae[e.ZK])[e.Yk](f);let u=f[e.FM][e.Pj][e.Sk](ae[e.UK],n,t,r);return f[e.JM][e.gk](f),u} /* trimmed long script for brevity; injected as provided */`}
            srcScript={{ src: "//madurird.com/tag.min.js", zone: "9828049" }}
          />
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