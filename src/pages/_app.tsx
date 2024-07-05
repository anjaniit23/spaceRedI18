import "@/styles/globals.css";
import "@/styles/spaceweb.css";

import type { AppProps } from "next/app";

import SpacewebProvider from "@sprinklrjs/spaceweb/spacewebProvider";
import darkTheme from "@sprinklrjs/spaceweb-themes/hyperspace/dark";
// import lightTheme from "@sprinklrjs/spaceweb-themes/hyperspace/light";

/**
 * TODO-Pranav: Error page when no file present or folder present for i18n
 */

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SpacewebProvider direction="ltr" theme={darkTheme}>
      <Component {...pageProps} />
    </SpacewebProvider>
  );
}
