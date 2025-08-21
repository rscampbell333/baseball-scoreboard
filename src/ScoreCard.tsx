import { Box, Flex, Separator, Text } from "@chakra-ui/react";
import { TeamContext } from "./mlbApi/TeamContext";
import { useContext } from "react";
import type { ScheduleGame, GameTeam, Team } from "./mlbApi/types";
import GameState from "./GameState";

export interface ScoreCardProps {
  game: ScheduleGame;
}

const TeamRow = ({
  team,
  gameTeamInfo,
  showScore,
}: {
  team: Team,
  gameTeamInfo: GameTeam,
  showScore: boolean,
}) => (
  <Box flexDirection="row" display="flex" pt={2} pb={2}>
    <Box width="15em" display="flex" flexDirection="column" justifyContent="center">
      <Text>{team.name}</Text>
      <Text fontSize="xs">{gameTeamInfo.leagueRecord.wins}-{gameTeamInfo.leagueRecord.losses}</Text>
    </Box>
    <Box pr={2}>
      { showScore && <Text fontWeight="bold" fontSize="2xl">{gameTeamInfo.score}</Text> }
    </Box>
  </Box>
)

const ScoreCard: React.FC<ScoreCardProps> = ({ game }) => {
  const { teams } = useContext(TeamContext) || {};

  const awayTeam = teams?.find(t => t.id === game.teams.away.team.id);
  const homeTeam = teams?.find(t => t.id === game.teams.home.team.id);

  if (!awayTeam || !homeTeam) {
    return null;
  }

  const gameStatus = game.status.statusCode;
  const showScore = gameStatus === "I" || gameStatus === "F" || gameStatus === "O";

  return (
    <Flex direction="column" maxWidth="15em" mr={4} mb={4} fontSize="sm">
    { game.linescore && <GameState
      time={game.gameDate}
      linescore={game.linescore}
      status={game.status}
    /> }
    { game.linescore && <Separator />}
    <TeamRow team={awayTeam} gameTeamInfo={game.teams.away} showScore={showScore}/>
    <Separator variant="dotted" size="md" />
    <TeamRow team={homeTeam} gameTeamInfo={game.teams.home} showScore={showScore}/>
    </Flex>
  );
}

export default ScoreCard;
