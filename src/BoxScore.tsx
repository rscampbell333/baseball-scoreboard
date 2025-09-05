import {
  GridItem,
  Separator,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import type { LineScore, Team } from "./mlbApi/types";
import { getTeamLineScores } from "./utils/BoxScoreUtils";

export interface BoxScoreProps {
  awayTeam: Team;
  homeTeam: Team;
  linescore: LineScore;
}

const LINE_SCORE_HEADER = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, '', 'R', 'H', 'E'];

export interface TeamLineProps {
  runsByInning: Array<number | string>;
  runs: number;
  hits: number;
  errors: number;
  leftOnBase: number;
}

const TeamLine = ({ runsByInning, runs, hits, errors, abbreviation }: TeamLineProps & { abbreviation: string}) => (
  <>
    <GridItem colSpan={2} textAlign={"left"} fontWeight={'bold'}>
      {abbreviation}
    </GridItem>
    { runsByInning.map((runs, i) => (
      <GridItem key={`${abbreviation}-${i}`}>
        {runs != undefined ? runs : ''}
      </GridItem>
    ))}
    <GridItem />
    <GridItem>
      {runs}
    </GridItem>
    <GridItem>
      {hits}
    </GridItem>
    <GridItem>
      {errors}
    </GridItem>
  </>
);

const BoxScore: React.FC<BoxScoreProps> = ({ linescore, awayTeam, homeTeam }) => {

  const teamLineScores = getTeamLineScores(linescore);
  const numOfColumns = 15;

  return (
    <Stack textAlign="center">
      <SimpleGrid columns={numOfColumns} paddingX="5px">
        { LINE_SCORE_HEADER.map((a, i) => (
          <GridItem key={`header-${i}`} colSpan={i === 0 ? 2 : undefined}>
            {a}
          </GridItem>
        ))}
      <GridItem colSpan={numOfColumns}>
        <Separator variant="dashed" />
      </GridItem>
      <TeamLine {...teamLineScores.away} abbreviation={awayTeam.abbreviation} />
      <TeamLine {...teamLineScores.home} abbreviation={homeTeam.abbreviation} />
      </SimpleGrid>
      <Separator />
    </Stack>
  );
};

export default BoxScore;
