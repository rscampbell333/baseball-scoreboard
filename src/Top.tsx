import { useEffect, useState } from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import ScoreCard from "./ScoreCard";
import { getSchedule, getTeams } from "./mlbApi/mlbApi";
import { TeamProvider } from "./mlbApi/TeamContext";
import type { Game, Schedule, Team } from "./mlbApi/types";
import { toaster } from "./components/ui/toaster";

const Top: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [schedule, setSchedule] = useState<Schedule>();

  useEffect(() => {
    getTeams(['deviceProperties'])
      .then(t => {
        setTeams(t);
      })
      .catch(e => { 
        console.error(e);
        toaster.create({
          title: 'Error loading teams',
          type: 'error'
        });
      });

    getSchedule()
      .then(s => setSchedule(s))
      .catch(e => { 
        console.error(e);
        toaster.create({
          title: 'Error loading games',
          type: 'error'
        });
      });
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
      <Flex p="4" width={{ base: '100%', md: "3xl" }} justifyContent={{ base: 'center', md: 'left' }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={'1px'}>
          { teams && games && games.map(g => <ScoreCard game={g} key={g.gamePk}/>) }
        </SimpleGrid>
      </Flex>
    </TeamProvider>
  );
};

export default Top;
