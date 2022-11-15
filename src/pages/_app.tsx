import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "../context";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Toaster />
      <Component {...pageProps} />
    </ContextProvider>
  );
}
