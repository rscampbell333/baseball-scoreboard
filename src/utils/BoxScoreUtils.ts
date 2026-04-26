
import type { TeamLine } from "@/Linescore/Innings";
import type {
  BoxScoreTeam,
  GameStatus, 
  LineScore,
  Play,
  Player,
  Plays,
} from "@/mlbApi/types";

interface TeamLineScores {
  away: TeamLine;
  home: TeamLine;
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

export const getBattingOrder = (team: BoxScoreTeam) => {
  const battingOrder: Array<Array<Player>> = new Array(9);

  for (const player of Object.values(team.players)) {
    if (player.battingOrder) {
      // batting order has 3 characters
      // the first is the spot in the batting order
      // the last indicates the order of batters in that position
      // second is ???
      const battingPosition = parseInt(player.battingOrder.charAt(0));
      const playerNumberAtPosition = parseInt(player.battingOrder.charAt(2));

      if (!battingOrder[battingPosition - 1]) {
        battingOrder[battingPosition - 1] = [];
      }

      battingOrder[battingPosition - 1][playerNumberAtPosition] = player;
    }
  }

  return battingOrder;
}
