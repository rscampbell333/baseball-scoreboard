import type { BattingStats, BoxScoreTeam, Play } from "@/mlbApi/types";
import { getBattingOrder } from "@/utils/BoxScoreUtils";
import { Badge, Table } from "@chakra-ui/react";

interface LineupTeamProps {
  expand: boolean;
  team: BoxScoreTeam;
  playsByBatter: Record<number, Play[]>;
}

const LineupTeam: React.FC<LineupTeamProps> = ({ expand, team }) => {
  const nameWidth = expand ? '12em' : undefined;
  const dataWidth = '3em';

  const dataColumns: Array<{ label: string, field: keyof BattingStats}> = [
    { label: 'AB', field: 'atBats' },
    { label: 'H',  field: 'hits'},
    { label: 'HR', field: 'homeRuns'},
    { label: 'K',  field: 'strikeOuts' },
    { label: 'BB', field: 'baseOnBalls' },
    { label: '2B', field: 'doubles' },
    { label: '3B', field: 'triples' },
  ];

  const battingOrder = getBattingOrder(team).flatMap(x => x);

  return (
    <Table.ScrollArea width="100%">
      <Table.Root 
        variant="line"
        css={{
          "& [data-sticky]": {
            position: "sticky",
            zIndex: 1,
            bg: "bg",

            _after: {
              content: '""',
              position: "absolute",
              pointerEvents: "none",
              top: "0",
              bottom: "-1px",
              width: "32px",
            },
          },

          "& [data-sticky=end]": {
            _after: {
              insetInlineEnd: "0",
              translate: "100% 0",
              shadow: "inset 8px 0px 8px -8px rgba(0, 0, 0, 0.16)",
            },
          },

          "& [data-sticky=start]": {
            _after: {
              insetInlineStart: "0",
              translate: "-100% 0",
              shadow: "inset -8px 0px 8px -8px rgba(0, 0, 0, 0.16)",
            },
          },
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              data-sticky={ expand ? "end" : undefined }
              minWidth={nameWidth}
              left="0"
            >
              Batters
            </Table.ColumnHeader>
            { expand && dataColumns.map(col => (
                <Table.ColumnHeader
                  key={col.label}
                  textAlign="center"
                  minWidth={dataWidth}
                >
                  {col.label}
                </Table.ColumnHeader>
              ),
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { battingOrder.map((player) => {
            const battingStats = player.stats.batting;
            const starter = player.battingOrder.endsWith('0');

            return (<Table.Row key={player.person.id}>
              <Table.Cell
                data-sticky={ expand ? "end" : undefined }
                minWidth={nameWidth}
                left="0"
              >
                {!starter && '-'} {player.person.fullName || ''} {' '}
                <Badge>{player.position.abbreviation}</Badge>
              </Table.Cell>
              { expand && dataColumns.map(col => (
                  <Table.Cell
                    key={`${col.field}-${player.person.id}`}
                    textAlign={'center'}
                    minWidth={dataWidth}
                  >
                    {battingStats[col.field]}
                  </Table.Cell>
                ),
              )}
            </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default LineupTeam;
