import type { StandingsRecord } from "@/mlbApi/types";
import { Box, Heading, Table } from "@chakra-ui/react";
import type { CSSProperties } from "react";

export interface DivisionStandingsProps {
  record: StandingsRecord;
}

const DivisionStandings: React.FC<DivisionStandingsProps> = ({ record }) => {
  const { division, teamRecords } = record;

  const nameCellStyle: CSSProperties = {
    width: '50%',
  }

  const dataCellStyle: CSSProperties = {
    width: '25%',
    textAlign: 'center',
  };

  return (
    <Box pt={6}>
      <Heading size="sm" pl={3}>{division.nameShort}</Heading>
      <Table.Root width="100%">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader css={nameCellStyle}>Team</Table.ColumnHeader>
            <Table.ColumnHeader css={dataCellStyle}>W</Table.ColumnHeader>
            <Table.ColumnHeader css={dataCellStyle}>L</Table.ColumnHeader>
            <Table.ColumnHeader css={dataCellStyle}>PCT</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {teamRecords.map(({ team, wins, losses, winningPercentage }) => (
            <Table.Row key={team.name}>
              <Table.Cell css={nameCellStyle}>{team.name}</Table.Cell>
              <Table.Cell css={dataCellStyle}>{wins}</Table.Cell>
              <Table.Cell css={dataCellStyle}>{losses}</Table.Cell>
              <Table.Cell css={dataCellStyle}>{winningPercentage}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default DivisionStandings;
