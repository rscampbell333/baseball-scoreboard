import type {
  BattingStats,
  BoxScoreTeam,
  PitchingStats,
  Play,
  Player,
} from "@/mlbApi/types";
import { getBattingOrder } from "@/utils/BoxScoreUtils";
import {
  Box,
  Heading,
} from "@chakra-ui/react";
import PlayerTable from "./PlayerTable";

interface LineupTeamProps {
  expand: boolean;
  team: BoxScoreTeam;
  playsByBatter: Record<number, Play[]>;
  gameId: string;
}

const LineupTeam: React.FC<LineupTeamProps> = ({ expand, team, gameId }) => {
  
  const battingDataColumns: Array<{ label: string, field: keyof BattingStats }> = [
    { label: 'AB', field: 'atBats' },
    { label: 'H',  field: 'hits'},
    { label: 'HR', field: 'homeRuns'},
    { label: 'K',  field: 'strikeOuts' },
    { label: 'BB', field: 'baseOnBalls' },
    { label: '2B', field: 'doubles' },
    { label: '3B', field: 'triples' },
  ];

  const pitchingDataColumns: Array<{ label: string, field: keyof PitchingStats }> = [
    { label: 'IP', field: 'inningsPitched' },
    { label: 'H', field: 'hits' },
    { label: 'R', field: 'runs' },
    { label: 'ER', field: 'earnedRuns' },
    { label: 'K', field: 'strikeOuts' },
    { label: 'BB', field: 'baseOnBalls' },
    { label: 'Pit', field: 'pitchesThrown' },
  ];

  const battingOrder = getBattingOrder(team).flatMap(x => x);
  const pitchers: Array<Player> = team.pitchers.map(id => team.players[`ID${id}`]);

  return (
    <Box width="100%">
      <Heading size="sm" pl="0.75rem">Batting</Heading>
      <PlayerTable
        expand={expand}
        players={battingOrder}
        dataColumns={battingDataColumns}
        gameId={gameId}
        isPitchers={false}
      />
      <Heading size="sm" pt={2} pl="0.75em">Pitching</Heading>
      <PlayerTable
        expand={expand}
        players={pitchers}
        dataColumns={pitchingDataColumns}
        gameId={gameId}
        isPitchers={true}
      />
    </Box>
  );
};

export default LineupTeam;
