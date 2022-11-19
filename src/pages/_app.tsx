import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "../context";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Toaster />
      <NextNProgress color="#6b21a8" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </ContextProvider>
  );
}
