import { useEffect, useState } from "react";
import { getGameById } from "../mlbApi/mlbApi";
import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router";
import BoxScore from "../BoxScore";

const Game: React.FC = () => {
  const [game, setGame] = useState();
  const { gameId } = useParams();

  useEffect(() => {
    if (gameId) {
      getGameById(gameId)
        .then(r => setGame(r))
        .catch(e => console.error(e));
    }
  }, [gameId]);

  return (
    <Stack>
      { game && <BoxScore
        linescore={game.liveData.linescore}
        awayTeam={game.gameData.teams.away} 
        homeTeam={game.gameData.teams.home}
      /> }
    </Stack>
  );
};

export default Game;
