import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { EmptyState, Flex, SimpleGrid } from "@chakra-ui/react";
import { FaBaseballBatBall } from "react-icons/fa6";
import ScoreCard from "../ScoreCard";
import { getSchedule, getTeams } from "../mlbApi/mlbApi";
import { TeamProvider } from "../mlbApi/TeamContext";
import type { ScheduleGame, Schedule, Team } from "../mlbApi/types";
import { toaster } from "../components/ui/toaster";
import { useIntervalAsync } from "../hooks/useInterval";
import DateSelector from "../DateSelector";

const Scoreboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialDate = searchParams.get('date');
  const [date, setDate] = useState(initialDate ? new Date(initialDate): new Date());
  const [teams, setTeams] = useState<Team[]>([]);

  const handleDateUpdate = (date: Date) => {
    setDate(date);
    setSearchParams(prev => {
      prev.set('date', date.toLocaleDateString());
      return prev;
    });
  }

  const loadSchedules = useCallback(() => getSchedule({
    hydrate: ['linescore'],
    startDate: date,
    endDate: date,
  }), [date]);
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

  let games: ScheduleGame[] = [];
  if (teams.length > 0 && schedule?.dates && schedule.dates.length > 0) {
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
      <Flex justifyContent="center">
        <DateSelector date={date} onSelect={handleDateUpdate}/>
      </Flex>
      <Flex pl="4" pr="4" width={{ base: '100%', md: "3xl" }} justifyContent={{ base: 'center', md: 'left' }}>
        <SimpleGrid columns={2} gap={4}>
          { teams && games.length > 0 && games.map(g => (
            <Link to={`/games/${g.gamePk}`} key={g.gamePk}>
              <ScoreCard game={g}/>
            </Link>
            ), 
          )}
        </SimpleGrid>
      </Flex>
      { (!teams || games.length === 0) && (
          <EmptyState.Root>
            <EmptyState.Content>
              <EmptyState.Indicator>
                <FaBaseballBatBall />
              </EmptyState.Indicator>
              <EmptyState.Title>No games on this date</EmptyState.Title>
            </EmptyState.Content>
          </EmptyState.Root>
        )}
    </TeamProvider>
  );
};

export default Scoreboard;
