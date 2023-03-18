import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import * as gtag from "@/lib/gtag";
import NProgress from "nprogress";
import "@/styles/globals.css";
import "@/styles/nprogress.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = (url) => {
      gtag.pageview(url);
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router.events]);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            function getViewPort(){
                let browserWidth = Math.max(
                  document.documentElement.clientWidth,
                  window.innerWidth || 0
                );
                let browserHeight = Math.max(
                  document.documentElement.clientHeight,
                  window.innerHeight || 0
                );
                return browserWidth + "x" + browserHeight;
              }
            gtag('js', new Date());
            gtag('config', '${gtag.GA_ID}', {
              page_path: window.location.pathname,
              view_port: getViewPort(),
            });
          `,
        }}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
