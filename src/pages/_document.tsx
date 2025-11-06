import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import React from 'react';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = async () => {
        return originalRenderPage({
          // @ts-ignore
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });
      };

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link
            rel="icon"
            href="/assets/img/icon-logo.png"
            type="image/png"
          />
          <link
            rel="apple-touch-icon"
            href="/assets/img/icon-logo.png"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""
          />
        </Head>
        <body>
          {process.env.NODE_ENV === 'development' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(){
                    try {
                      if ('serviceWorker' in navigator) {
                        navigator.serviceWorker.getRegistrations()
                          .then(function(regs){ regs.forEach(function(r){ r.unregister(); }); })
                          .catch(function(){});
                      }
                      if (window.caches) {
                        caches.keys().then(function(keys){ keys.forEach(function(k){ caches.delete(k); }); });
                      }
                    } catch(e) {}
                  })();
                `,
              }}
            />
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
