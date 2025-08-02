import { ColorModeButton } from "./components/ui/color-mode";
import { Provider } from "./components/ui/provider"

interface AppProps {
  Component: React.FC<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps?: any;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
      <ColorModeButton />
    </Provider>
  )
}