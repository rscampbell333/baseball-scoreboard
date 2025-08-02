import { useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ScoreCard from "./ScoreCard";
import { getSchedule, getTeams } from "./mlbApi/mlbApi";
import { TeamProvider } from "./mlbApi/TeamContext";
import type { Game, Schedule, Team } from "./mlbApi/types";

const Top: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [schedule, setSchedule] = useState<Schedule>();

  useEffect(() => {
    getTeams()
      .then(t => {
        setTeams(t);
      })
      .catch(r => console.error(r));

    getSchedule()
      .then(s => setSchedule(s))
      .catch(e => console.error(e));
  }, []);

  let games: Game[] = [];
  if (teams.length > 0 && schedule) {
    games = schedule?.dates[0].games;
    const rangersIndex = games.findIndex(game => game.teams.away.team.id === 140 || game.teams.home.team.id === 140);
    if (rangersIndex > -1) {
      const rangersGame = games[rangersIndex];
      games.splice(rangersIndex, 1);
      games.unshift(rangersGame);
    }
  }

  return (
    <TeamProvider teams={teams}>
      <Box p="4" width="3xl">
        <SimpleGrid columns={[2]} columnGap={'1px'}>
        { games && games.map(g => <ScoreCard game={g} key={g.gamePk}/>) }
        </SimpleGrid>
      </Box>
    </TeamProvider>
  );
};

export default Top;
