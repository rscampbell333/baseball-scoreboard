import { Flex, Text } from "@chakra-ui/react";
import type { BoxScore } from "./mlbApi/types";

export interface LineupProps {
  boxscore: BoxScore;
}

const Lineup: React.FC<LineupProps> = ({ boxscore }) => (
  <Flex>
    <Flex direction={'column'} width="50%">
      {boxscore.teams.away.battingOrder.map(id => 
        <Text>{boxscore.teams.away.players[`ID${id}`]?.person.fullName}</Text>)}
    </Flex>
    <Flex direction={'column'} width="50%">
      {boxscore.teams.home.battingOrder.map(id => 
        <Text>{boxscore.teams.home.players[`ID${id}`]?.person.fullName}</Text>)}
    </Flex>
  </Flex>
);

export default Lineup;
