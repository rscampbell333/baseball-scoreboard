import DivisionStandings from "@/standings/DivisionStandings";
import { useStandings } from "../hooks/useStandings";
import { Flex } from "@chakra-ui/react";

const Standings: React.FC = () => {
  const { alStandings, nlStandings } = useStandings();
  
  return (
    <Flex direction="column" pl="4" pr="4">
      <Flex direction="column">
        {alStandings?.records.map(r => <DivisionStandings record={r} key={String(r.division.id)} />)}
      </Flex>

      <Flex direction="column">
        {nlStandings?.records.map(r => <DivisionStandings record={r} key={String(r.division.id)} />)}
      </Flex>
    </Flex>
  );
};

export default Standings;
