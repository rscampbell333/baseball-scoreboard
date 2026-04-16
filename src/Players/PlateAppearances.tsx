import { FaBaseball } from "react-icons/fa6";
import type { Play } from "@/mlbApi/types";
import { EmptyState, Table } from "@chakra-ui/react";

interface PlateAppearanceProps {
  plateAppearances: Array<Play>;
}

const getNotes = (play: Play): string => {
  if (play.result.rbi > 0) {
    return `, ${play.result.rbi} RBI`;
  } 

  return '';
}

const PlateAppearances: React.FC<PlateAppearanceProps> = ({
  plateAppearances,
}) => {
  const displayPlateAppearances = plateAppearances.filter(play => play.about.isComplete);

  if (displayPlateAppearances.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FaBaseball />
          </EmptyState.Indicator>
          <EmptyState.Title>No plate appearances yet</EmptyState.Title>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Inning</Table.ColumnHeader>
          <Table.ColumnHeader>Result</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {displayPlateAppearances.map(play => (
          <Table.Row key={play.about.atBatIndex}>
            <Table.Cell>{play.about.inning}</Table.Cell>
            <Table.Cell>{`${play.result.event}${getNotes(play)}`}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default PlateAppearances;