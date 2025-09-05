import type { TeamLineProps } from "@/BoxScore";
import type { GameStatus, LineScore, Play, Plays } from "@/mlbApi/types";

interface TeamLineScores {
  away: TeamLineProps;
  home: TeamLineProps;
} 

export const isGameInProgress = (status: GameStatus) => {
  return status.statusCode === 'I';
}

export const getTeamLineScores = (linescore: LineScore): TeamLineScores => {
  const awayRunsByInning = Array<number | string>(9).fill('');
  const homeRunsByInning = Array<number | string>(9).fill('');

  linescore.innings.forEach((inning, i) => {
    awayRunsByInning[i] = inning.away.runs;
    homeRunsByInning[i] = inning.home.runs;
  });

  return {
    away: {
      runsByInning: awayRunsByInning,
      ...linescore.teams.away,
    },
    home: {
      runsByInning: homeRunsByInning,
      ...linescore.teams.home,
    },
  };
}

export const getPlaysForBatter = (plays: Plays, batterPlayerId: number) => {
  return plays.allPlays?.filter(play => play.matchup.batter.id === batterPlayerId) || [];
}

export const groupPlaysByBatter = (plays: Plays) => {
  const playsByBatter: Record<number, Array<Play>> = {};

  plays.allPlays?.forEach(play => {
    if (!playsByBatter[play.matchup.batter.id]) {
      playsByBatter[play.matchup.batter.id] = [play];
    } else {
      playsByBatter[play.matchup.batter.id].push(play);
    }
  });

  return playsByBatter;
}
