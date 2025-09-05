import { useCallback } from "react";
import { getGameById } from "../mlbApi/mlbApi";
import { Box, Separator, Stack } from "@chakra-ui/react";
import { useParams } from "react-router";
import BoxScore from "../BoxScore";
import Lineup from "../Lineup/Lineup";
import { useIntervalAsync } from "../hooks/useInterval";
import CurrentPlay from "../CurrentPlay";
import { groupPlaysByBatter, isGameInProgress } from "../utils/BoxScoreUtils";

const Game: React.FC = () => {
  const { gameId } = useParams();

  const loadGames = useCallback(() => getGameById(gameId as string), [gameId]);
  const game = useIntervalAsync(loadGames, 15000);

  const playsByBatter = game ? groupPlaysByBatter(game.liveData.plays) : [];

  return (
    <Box p="4">
      { game && (
        <Stack>
          <BoxScore
            linescore={game.liveData.linescore}
            awayTeam={game.gameData.teams.away} 
            homeTeam={game.gameData.teams.home}
          />
          { isGameInProgress(game.gameData.status) && <>
            <CurrentPlay liveData={game.liveData} />
            <Separator />
          </> }
          <Lineup
            gameData={game.gameData}
            linescore={game.liveData.linescore}
            boxscore={game.liveData.boxscore}
            playsByBatter={playsByBatter}
          />
        </Stack>
      )}
    </Box>
  );
};

export default Game;
