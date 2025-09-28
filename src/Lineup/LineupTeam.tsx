import type { BoxScoreTeam, Play } from "@/mlbApi/types";
import { Table } from "@chakra-ui/react";

interface LineupTeamProps {
  expand: boolean;
  team: BoxScoreTeam;
  playsByBatter: Record<number, Play[]>;
}

const LineupTeam: React.FC<LineupTeamProps> = ({ expand, team }) => {
  const nameWidth = expand ? '40%' : undefined;

  return (
    <Table.Root variant="line">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader width={nameWidth}>Batters</Table.ColumnHeader>
          { expand && (
            <>
              <Table.ColumnHeader textAlign={'center'}>AB</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={'center'}>H</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={'center'}>HR</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={'center'}>K</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={'center'}>BB</Table.ColumnHeader>
            </>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { team.battingOrder.map((id) => {
          const player = team.players[`ID${id}`];
          const battingStats = player.stats.batting;

          return (<Table.Row key={id}>
            <Table.Cell width={nameWidth}>{player.person.fullName || ''}</Table.Cell>
            { expand && (
              <>
                <Table.Cell textAlign={'center'}>{battingStats.atBats}</Table.Cell>
                <Table.Cell textAlign={'center'}>{battingStats.hits}</Table.Cell>
                <Table.Cell textAlign={'center'}>{battingStats.homeRuns}</Table.Cell>
                <Table.Cell textAlign={'center'}>{battingStats.strikeOuts}</Table.Cell>
                <Table.Cell textAlign={'center'}>{battingStats.baseOnBalls}</Table.Cell>
              </>
            )}
          </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default LineupTeam;
