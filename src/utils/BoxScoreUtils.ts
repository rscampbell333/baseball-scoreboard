import type { TeamLineProps } from "@/BoxScore";
import type { LineScore } from "@/mlbApi/types";

interface TeamLineScores {
  away: TeamLineProps;
  home: TeamLineProps;
} 

export const getTeamLineScores = (linescore: LineScore): TeamLineScores => {
  const awayRunsByInning = Array<number>(9);
  const homeRunsByInning = Array<number>(9);

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
    }
  };
}