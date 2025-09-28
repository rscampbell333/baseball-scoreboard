import { Flex, Separator, Tabs } from "@chakra-ui/react";
import type { BoxScore, GameData, LineScore, Play } from "../mlbApi/types";
import LineupTeam from "./LineupTeam";
import { useEffect, useState } from "react";
import { isGameInProgress } from "../utils/BoxScoreUtils";

export interface LineupProps {
  gameData: GameData;
  boxscore: BoxScore;
  linescore: LineScore;
  playsByBatter: Record<number, Play[]>;
}

const Lineup: React.FC<LineupProps> = ({ gameData, boxscore, linescore, playsByBatter }) => {
  const [isTeamSelectedManually, setIsTeamSelectedManually] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>();

  useEffect(() => {
    if (!isTeamSelectedManually) {
      if (isGameInProgress(gameData.status)) {
        if (linescore.isTopInning) {
          setSelectedTab('away')
        } else {
          setSelectedTab('home')
        }
      } else {
        setSelectedTab('default')
      }
    }
  }, [gameData, linescore, isTeamSelectedManually]);

  const handleValueChange = (e: Tabs.TabsValueChangeDetails) => {
    setSelectedTab(e.value);
    setIsTeamSelectedManually(true);
  }
  
  return (
    <Tabs.Root
      lazyMount
      unmountOnExit
      value={selectedTab}
      onValueChange={handleValueChange}
    >
      <Tabs.List>
        <Tabs.Trigger value="away" width="50%">
          {gameData.teams.away.teamName}
        </Tabs.Trigger>
        <Tabs.Trigger value="home" width="50%">
          {gameData.teams.home.teamName}
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="away">
        <LineupTeam
          expand={true}
          team={boxscore.teams.away}
          playsByBatter={playsByBatter}
        />
      </Tabs.Content>
      <Tabs.Content value="home">
        <LineupTeam
          expand={true}
          team={boxscore.teams.home}
          playsByBatter={playsByBatter}
        />
      </Tabs.Content>
      <Tabs.Content value="default">
        <Flex>
          <LineupTeam
            expand={false}
            team={boxscore.teams.away}
            playsByBatter={playsByBatter}
          />
          <Separator orientation={'vertical'} />
          <LineupTeam
            expand={false}
            team={boxscore.teams.home}
            playsByBatter={playsByBatter}
          />
        </Flex>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Lineup;
