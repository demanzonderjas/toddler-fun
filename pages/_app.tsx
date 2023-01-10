import "../styles/globals.scss";
import type { AppProps } from "next/app";

import { enableStaticRendering } from "mobx-react-lite";
// there is no window object on the server
enableStaticRendering(typeof window === "undefined");

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
