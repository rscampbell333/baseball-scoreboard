import { Flex, Spacer, Text } from "@chakra-ui/react";
import type { GameStatus, LineScore } from "./mlbApi/types";

export interface GameStateProps {
  time: string;
  linescore: LineScore;
  status: GameStatus;
}

const GameState: React.FC<GameStateProps> = ({ time, linescore, status }) => {
  let state: string = '';
  let count: string | undefined;
  
  if (status.statusCode === 'P' || status.statusCode === 'S') {
    const gameTime = new Date(time);
    state = gameTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
  } else if (status.statusCode === 'O' || status.statusCode === 'F') {
    state = 'Final';
  } else {
    const { balls, strikes, outs } = linescore;
    count = `${balls}-${strikes}, ${outs} ${ outs === 1 ? 'out' : 'outs' }`
    state = `${linescore.inningHalf} ${linescore.currentInning}`
  }

  return (
    <Flex direction='row' justify='flex-end' fontSize="sm">
      { count && <Text>{count}</Text> }
      { count && <Spacer />}
      <Text>
        {state}
      </Text>
    </Flex>
  );
};

export default GameState;
