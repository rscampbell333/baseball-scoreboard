import type { BattingStats, PitchingStats, Player } from "@/mlbApi/types";
import {
  Badge,
  Link as ChakraLink,
  Table,
} from "@chakra-ui/react";
import { Link } from "react-router";

interface BasePlayerTableProps {
  expand: boolean;
  players: Array<Player>;
  gameId: string;
}

interface BattingPlayerTableProps extends BasePlayerTableProps {
  dataColumns: Array<{ label: string, field: keyof BattingStats}>;
  isPitchers: false;
}

interface PitchingPlayerTableProps extends BasePlayerTableProps {
  dataColumns: Array<{ label: string, field: keyof PitchingStats}>;
  isPitchers: true;
}

const buildFields = (
  props: BattingPlayerTableProps | PitchingPlayerTableProps,
  player: Player,
  dataWidth: string,
) => {
  if (props.isPitchers) {
    return props.dataColumns.map(col => (
      <Table.Cell
        key={`${col.field}-${player.person.id}`}
        textAlign={'center'}
        minWidth={dataWidth}
      >
        {player.stats.pitching[col.field]}
      </Table.Cell>
    ));
  } else {
    return props.dataColumns.map(col => (
      <Table.Cell
        key={`${col.field}-${player.person.id}`}
        textAlign={'center'}
        minWidth={dataWidth}
      >
        {player.stats.batting[col.field]}
      </Table.Cell>
    ));
  }
}

const PlayerTable: React.FC<BattingPlayerTableProps | PitchingPlayerTableProps> = (props) => {
  const {
    expand,
    dataColumns,
    gameId,
    players,
    isPitchers,
  } = props;

  const nameWidth = expand ? '12em' : undefined;
  const dataWidth = '3em';

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
          { players.map((player) => {
            const starter = !isPitchers && player.battingOrder.endsWith('0');

            return (<Table.Row key={player.person.id}>
              <Table.Cell
                data-sticky={ expand ? "end" : undefined }
                minWidth={nameWidth}
                left="0"
              >
                {!starter && !isPitchers && '- '}
                <ChakraLink asChild>
                  <Link to={`/games/${gameId}/players/${player.person.id}`}>
                    {player.person.fullName}
                  </Link>
                </ChakraLink>
                {' '}
                { !isPitchers && <Badge>{player.position.abbreviation}</Badge> }
              </Table.Cell>
              { expand && buildFields(props, player, dataWidth) }
            </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default PlayerTable;
