import { Routes, Route } from "react-router";
import { Provider } from "./components/ui/provider"
import { Toaster } from "./components/ui/toaster";
import Scoreboard from "./pages/Scoreboard";
import Game from "./pages/Game";
import PageWrapper from "./Layout/PageWrapper";
import Standings from "./pages/Standings";

export default function App() {
  return (
    <Provider>
        <PageWrapper>
          <Routes>
              <Route path="/" element={<Scoreboard />} />
              <Route path="games/:gameId" element={<Game />} />
              <Route path="/standings" element={<Standings />} />
          </Routes>
        </PageWrapper>
      <Toaster />
    </Provider>
  )
}