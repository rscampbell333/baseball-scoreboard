import { Flex } from "@chakra-ui/react"
import { useEffect, useRef } from "react";
import Column from "./Column";

export interface TeamLine {
  runsByInning: Array<number | string>;
  runs: number;
  hits: number;
  errors: number;
  leftOnBase: number;
}

interface InningsProps {
  away: TeamLine;
  home: TeamLine;
}

const Innings: React.FC<InningsProps> = ({ away, home }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // initially display from the end of the scroll area
  // the div starts invisible to prevent seeing it flip 
  // from left to right, so we need to make it visible
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollWidth;
      ref.current.style.visibility = 'visible';
    }
  });

  return (
    <Flex
      ref={ref}
      textAlign="center" 
      overflowX="scroll" 
      visibility="hidden"
      overscrollBehavior="none"
    >
      { away.runsByInning.map((awayRuns, i) => (
        <Column
          label={`${i + 1}`}
          awayValue={awayRuns}
          homeValue={home.runsByInning[i]}
          minWidth="calc(100% / 9)"
          maxWidth="calc(100% / 9)"
        />
      ))}
    </Flex>
  );
};

export default Innings;
