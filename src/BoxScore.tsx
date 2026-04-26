import {
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import type { LineScore, Team } from "./mlbApi/types";
import { getTeamLineScores } from "./utils/BoxScoreUtils";
import type React from "react";
import TeamNames from "./Linescore/TeamNames";
import Innings from "./Linescore/Innings";
import Column from "./Linescore/Column";

export interface BoxScoreProps {
  awayTeam: Team;
  homeTeam: Team;
  linescore: LineScore;
}

const BoxScore: React.FC<BoxScoreProps> = ({ linescore, awayTeam, homeTeam }) => {
  
  const numOfColumns = 15;
  const teamLineScores = getTeamLineScores(linescore);

  return (
    <SimpleGrid columns={numOfColumns} paddingX="5px">
      <GridItem colSpan={2}>
        <TeamNames away={awayTeam.abbreviation} home={homeTeam.abbreviation} />
      </GridItem>
      <GridItem colSpan={9}>
        <Innings {...teamLineScores} />
      </GridItem>
      <GridItem>
        <Column />
      </GridItem>
      <GridItem>
        <Column
          label="R"
          awayValue={teamLineScores.away.runs}
          homeValue={teamLineScores.home.runs}
        />
      </GridItem>
      <GridItem>
        <Column
          label="H"
          awayValue={teamLineScores.away.hits}
          homeValue={teamLineScores.home.hits}
        />
      </GridItem>
      <GridItem>
        <Column
          label="E"
          awayValue={teamLineScores.away.errors}
          homeValue={teamLineScores.home.errors}
        />
      </GridItem>
    </SimpleGrid>
  );
};

export default BoxScore;
