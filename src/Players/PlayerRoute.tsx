import { useGameStateContext } from "@/hooks/useGameStateContext";
import type { Game, Play, Player } from "@/mlbApi/types";
import { useParams } from "react-router";
import PlayerCard from "./PlayerCard";
import { useIntervalAsync } from "@/hooks/useInterval";
import { getPlayerGameStats } from "@/mlbApi/mlbApi";
import { useCallback } from "react";

const findPlayer = (playerId: string, game: Game): { player: Player, team: string } => {
  const key = `ID${playerId}`;
  const boxscoreTeams = game.liveData.boxscore.teams;
  let player = boxscoreTeams.away.players[key];

  if (player) {
    return { player, team: boxscoreTeams.away.team.name };
  }

  player = boxscoreTeams.home.players[key];
  return { player, team: boxscoreTeams.home.team.name };
}

const findPlaysForBatter = (playerId: string, game: Game): Array<Play> => {
  const playerIdInt = parseInt(playerId);
  const plays = game.liveData.plays.allPlays?.filter(play => play.matchup.batter.id === playerIdInt) || [];
  return plays;
}

const PlayerRoute = () => {
  const { playerId } = useParams();
  const { game } = useGameStateContext();
  
  const gameId = game ? `${game.gamePk}` : null;
  const loadPlayerStats = useCallback(async () => {
    if (!playerId || !gameId) {
      return null;
    }

    return getPlayerGameStats(playerId, gameId)
  }, [playerId, gameId]);
  const playerGameStats = useIntervalAsync(loadPlayerStats, 15000);

  if (!playerId || !game) {
    return <div>Player not found!</div>
  }

  const { player, team } = findPlayer(playerId, game);
  const plateAppearances = findPlaysForBatter(playerId, game);

  return <PlayerCard
    team={team} 
    player={player} 
    playerGameStats={playerGameStats}
    plateAppearances={plateAppearances}
  />
}

export default PlayerRoute;
