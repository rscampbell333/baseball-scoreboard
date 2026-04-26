import { Flex, Separator, Text } from "@chakra-ui/react";
import type React from "react";

interface TeamNamesProps {
  away: string;
  home: string;
}

const TeamNames: React.FC<TeamNamesProps> = ({ away, home }) => (
  <Flex direction="column">
    <Text whiteSpace="pre"> </Text>
    <Separator />
    <Text fontWeight="bold">{away}</Text>
    <Text fontWeight="bold">{home}</Text>
  </Flex>
);

export default TeamNames;
