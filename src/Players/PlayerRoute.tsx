import { useGameStateContext } from "@/hooks/useGameStateContext";
import type { Game, Player } from "@/mlbApi/types";
import { useParams } from "react-router";
import PlayerCard from "./PlayerCard";

const findPlayer = (playerId: string, game: Game): Player => {
  const boxscoreTeams = game.liveData.boxscore.teams;
  const player = boxscoreTeams.away.players[playerId] || boxscoreTeams.home.players[playerId];

  return player;
}

const PlayerRoute = () => {
  const { playerId } = useParams();
  const { game } = useGameStateContext();

  if (!playerId || !game) {
    return <div>Player not found</div>
  }

  const player = findPlayer(playerId, game);

  return <PlayerCard player={player} />
}

export default PlayerRoute;
