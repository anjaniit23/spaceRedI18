import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import {
  StyleProvider,
  getStylesheets,
  isServer,
} from "@sprinklrjs/spaceweb/styleEngine";
import type { Sheet } from "@sprinklrjs/spaceweb";

function AppWithStyleProvider(App: any) {
  const Page = (pageProps: any) => (
    <StyleProvider>
      <App {...pageProps} />
    </StyleProvider>
  );
  Page.displayName = "Page";
  return Page;
}

export default class MyDocument extends Document<{ stylesheets: Sheet[] }> {
  static async getInitialProps(ctx: DocumentContext): Promise<
    DocumentInitialProps & {
      stylesheets?: Sheet[];
    }
  > {
    const initialProps = await Document.getInitialProps(ctx);

    const page = ctx.renderPage(AppWithStyleProvider);

    if (isServer)
      return { ...initialProps, ...page, stylesheets: getStylesheets() };
    return page;
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          {this.props.stylesheets.map((sheet: Sheet, index: number): any => (
            <style
              className="_spaceweb_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs["data-hydrate"]}
              key={index} //eslint-disable-line react/no-array-index-key
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
