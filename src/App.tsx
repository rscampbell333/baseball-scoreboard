import { Routes, Route } from "react-router";
import { Provider } from "./components/ui/provider"
import { Toaster } from "./components/ui/toaster";
import Scoreboard from "./pages/Scoreboard";
import Game from "./pages/Game";
import PageWrapper from "./Layout/PageWrapper";

export default function App() {
  return (
    <Provider>
        <PageWrapper>
          <Routes>
              <Route path="/" element={<Scoreboard />} />
              <Route path="games/:gameId" element={<Game />} />
          </Routes>
        </PageWrapper>
      <Toaster />
    </Provider>
  )
}