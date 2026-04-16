import { Flex } from "@chakra-ui/react";
import PlayerStat from "./PlayerStat";
import type { Player } from "@/mlbApi/types";
import type React from "react";

interface PlayerStatsProps {
  player: Player;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ player }) => (
  <Flex>
    <PlayerStat
      label="AVG"
      helpText="Batting Average"
      value={player.seasonStats.batting.avg}
    />
    <PlayerStat
      label="OBP"
      helpText="On-base Percentage"
      value={player.seasonStats.batting.obp}
    />
    <PlayerStat
      label="SLG"
      helpText="Slugging Average"
      value={player.seasonStats.batting.slg}
    />
  </Flex>
);

export default PlayerStats;
