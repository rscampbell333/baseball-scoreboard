import { Provider } from "./components/ui/provider"
import { Toaster } from "./components/ui/toaster";
import Top from "./Top";

export default function App() {
  return (
    <Provider>
      <Top />
      <Toaster />
    </Provider>
  )
}