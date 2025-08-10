import { useCallback, useEffect, useState } from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import ScoreCard from "../ScoreCard";
import { getSchedule, getTeams } from "../mlbApi/mlbApi";
import { TeamProvider } from "../mlbApi/TeamContext";
import type { Game, Schedule, Team } from "../mlbApi/types";
import { toaster } from "../components/ui/toaster";
import { useIntervalAsync } from "../hooks/useInterval";
import { Link } from "react-router";

const Scoreboard: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  const loadSchedules = useCallback(() => getSchedule({ hydrate: ['linescore']}), []);
  const schedule = useIntervalAsync<Schedule>(loadSchedules, 15000);

  useEffect(() => {
    getTeams(['deviceProperties'])
      .then(t => {
        setTeams(t);
      })
      .catch(e => { 
        console.error(e);
        toaster.create({
          title: 'Error loading teams',
          type: 'error',
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
        <SimpleGrid columns={2}>
          { teams && games && games.map(g => (
            <Link to={`/games/${g.gamePk}`} key={g.gamePk}>
              <ScoreCard game={g}/>
            </Link>
            ), 
          )}
        </SimpleGrid>
      </Flex>
    </TeamProvider>
  );
};

export default Scoreboard;
