import { Box, Flex, Separator, Text } from "@chakra-ui/react";
import type { BoxScore, BoxScoreTeam } from "./mlbApi/types";

export interface LineupProps {
  boxscore: BoxScore;
}

const TeamLineup = ({ team }: { team: BoxScoreTeam }) => (
  <Flex direction={'column'}>
    {team.battingOrder.map((id, i) => <>
      <Text>{team.players[`ID${id}`]?.person.fullName}</Text>
      { i < team.battingOrder.length - 1 && <Separator variant={'dotted'} size={'md'}/> }
      </>)}
  </Flex> 
)

const Lineup: React.FC<LineupProps> = ({ boxscore }) => (
  <Flex>
    <Box w="50%" mr={2}>
      <TeamLineup team={boxscore.teams.away} />
    </Box>
    <Separator orientation={"vertical"} />
    <Box w="50%" ml={2}>
      <TeamLineup team={boxscore.teams.home} />
    </Box>
  </Flex>
);

export default Lineup;
