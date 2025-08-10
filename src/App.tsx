import { Routes, Route } from "react-router";
import { Provider } from "./components/ui/provider"
import { Toaster } from "./components/ui/toaster";
import Scoreboard from "./pages/Scoreboard";
import Game from "./pages/Game";

export default function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Scoreboard />} />
        <Route path="games/:gameId" element={<Game />} />
      </Routes>
      <Toaster />
    </Provider>
  )
}