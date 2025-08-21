import type { TeamLineProps } from "@/BoxScore";
import type { GameStatus, LineScore } from "@/mlbApi/types";

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