import type { PropsWithChildren } from "react";
import { ColorModeButton } from "./components/ui/color-mode";
import { Provider } from "./components/ui/provider"
import { Toaster } from "./components/ui/toaster";
interface AppProps {
  Component: React.FC<PropsWithChildren>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps?: PropsWithChildren;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
      <ColorModeButton />
      <Toaster />
    </Provider>
  )
}