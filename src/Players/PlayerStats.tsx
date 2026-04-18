import { Flex } from "@chakra-ui/react";
import PlayerStat from "./PlayerStat";
import type React from "react";

interface Stat {
  label: string;
  helpText: string;
  value: string | number;
}

interface PlayerStatsProps {
  stats: readonly [Stat, Stat, Stat]
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ stats }) => (
  <Flex>
    { stats.map(stat => (
      <PlayerStat key={stat.label} { ...stat } />
    ))}
  </Flex>
);

export default PlayerStats;
