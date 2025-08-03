import { Box, Card, Image, Separator, Text } from "@chakra-ui/react";
import { TeamContext } from "./mlbApi/TeamContext";
import { useContext } from "react";
import type { Game, GameTeam, Team } from "./mlbApi/types";

export interface ScoreCardProps {
  game: Game;
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
    <Image src={team.deviceProperties?.favicon.image?.cuts['256x256']?.src} height="3em" mr={1}/>
    <Box width="15em" display="flex" flexDirection="column" justifyContent="center">
      <Text>{team.name}</Text>
      <Text fontSize="xs">{gameTeamInfo.leagueRecord.wins}-{gameTeamInfo.leagueRecord.losses}</Text>
    </Box>
    <Box pr={2}>
      { showScore && <Text fontWeight="bold" fontSize="3xl">{gameTeamInfo.score}</Text> }
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
    <Card.Root flexDirection="row" size="sm" mr={4} mb={4}>
      <Card.Body>
        <TeamRow team={awayTeam} gameTeamInfo={game.teams.away} showScore={showScore}/>
        <Separator />
        <TeamRow team={homeTeam} gameTeamInfo={game.teams.home} showScore={showScore}/>
      </Card.Body>
    </Card.Root>
  );
}

export default ScoreCard;
