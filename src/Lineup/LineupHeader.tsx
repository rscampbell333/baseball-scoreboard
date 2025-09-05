import type { Team } from "@/mlbApi/types";
import { Box, Button, Flex } from "@chakra-ui/react";

export interface LineupHeaderProps {
  awayTeam: Team;
  homeTeam: Team;
  onSelectTeam: (isHome: boolean) => void;
}

const LineupHeader: React.FC<LineupHeaderProps> = ({ awayTeam, homeTeam, onSelectTeam }) => (
  <Flex>
    <Box w="50%">
      <Button
        fontWeight={'bold'} 
        variant="ghost" 
        size="lg" 
        padding={'3'}
        onClick={() => onSelectTeam(false)}
      >
          {awayTeam.clubName}
      </Button>
    </Box>
    <Box w="50%">
      <Button 
        fontWeight={'bold'} 
        variant="ghost" 
        size="lg" 
        padding={'3'}
        onClick={() => onSelectTeam(true)}
        >
          {homeTeam.clubName}
      </Button>
    </Box>
  </Flex>
);

export default LineupHeader;
