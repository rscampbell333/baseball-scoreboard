import { Box, Flex, Separator } from "@chakra-ui/react";
import type { BoxScore, GameData, LineScore, Play } from "../mlbApi/types";
import LineupTeam from "./LineupTeam";
import LineupHeader from "./LineupHeader";
import { useEffect, useState } from "react";
import { isGameInProgress } from "../utils/BoxScoreUtils";

export interface LineupProps {
  gameData: GameData;
  boxscore: BoxScore;
  linescore: LineScore;
  playsByBatter: Record<number, Play[]>;
}

const Lineup: React.FC<LineupProps> = ({ gameData, boxscore, linescore, playsByBatter }) => {
  const [expandHome, setExpandHome] = useState(false);
  const [expandAway, setExpandAway] = useState(false);
  const [isTeamSelectedManually, setIsTeamSelectedManually] = useState(false);

  useEffect(() => {
    if (!isTeamSelectedManually && isGameInProgress(gameData.status)) {
      if (linescore.isTopInning) {
        setExpandAway(true);
        setExpandHome(false);
      } else {
        setExpandAway(false);
        setExpandHome(true);
      }
    }
  }, [gameData, linescore]);

  const handleSelectTeam = (isHome: boolean) => {
    if (isHome) {
      setExpandAway(false);
      setExpandHome(true);
    } else {
      setExpandAway(true);
      setExpandHome(false);
    }

    setIsTeamSelectedManually(true);
  }

  const awayStyle = expandAway ? { width: '100%' } : { width: '50%', marginRight: '2px' }

  const homeStyle = expandHome ? { width: '100%' } : { width: '50%', marginLeft: '2px' }
  
  return (
    <Flex direction={'column'}>
      <LineupHeader
        awayTeam={gameData.teams.away}
        homeTeam={gameData.teams.home}
        onSelectTeam={handleSelectTeam}
      />
      { (expandAway || expandHome) && <><Separator mb={2}/></>}
      <Flex>
        { !expandHome && (
          <Box style={awayStyle}>
            <LineupTeam
              expand={expandAway}
              team={boxscore.teams.away}
              playsByBatter={playsByBatter}
            />
          </Box>
        )}
        { !expandAway && !expandHome && <Separator orientation={'vertical'} /> }
        { !expandAway && (
          <Box style={homeStyle}>
            <LineupTeam
              expand={expandHome} 
              team={boxscore.teams.home}
              playsByBatter={playsByBatter}
            />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Lineup;
