import { Flex, GridItem, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import type { LiveData } from "./mlbApi/types";

export interface CurrentPlayProps {
  liveData: LiveData;
}

const CurrentPlay: React.FC<CurrentPlayProps> = ({ liveData }) => {
  const { currentPlay } = liveData.plays;
  return (
    <SimpleGrid columns={4}>
      <GridItem colSpan={2}>
        <SimpleGrid columns={5}>
          <GridItem>
            <Text fontWeight={'bold'}>AB</Text>
          </GridItem>
          <GridItem colSpan={4}>
            <Text>{currentPlay.matchup.batter.fullName}</Text>
          </GridItem>
          <GridItem>
            <Text fontWeight={'bold'}>P</Text>
          </GridItem>
          <GridItem colSpan={4}>
            <Text>{currentPlay.matchup.pitcher.fullName}</Text>
          </GridItem>
        </SimpleGrid>
      </GridItem>
      <Flex direction="column" textAlign={'center'}>
        <Text>{currentPlay.count.balls}-{currentPlay.count.strikes}</Text>
        <Text>{currentPlay.count.outs} outs</Text>
      </Flex>
      <Spacer />
    </SimpleGrid>
  );
};

export default CurrentPlay;
