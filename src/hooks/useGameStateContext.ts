import type { Game } from "@/mlbApi/types";
import { useOutletContext } from "react-router";

export interface GameStateContextType {
  game?: Game;
}

export const useGameStateContext = () => {
  return useOutletContext<GameStateContextType>();
}
