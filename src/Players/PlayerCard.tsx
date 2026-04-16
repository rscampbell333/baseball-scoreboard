import type {
  HittingGameLogSplit,
  Play,
  Player,
  PlayerGameStats,
  Split,
} from "@/mlbApi/types";
import {
  CloseButton,
  Dialog,
  Flex,
  Portal,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import Section from "./Section";
import PlayerStats from "./PlayerStats";
import PlateAppearances from "./PlateAppearances";
import { useNavigate } from "react-router";

interface PlayerCardProps {
  team: string;
  player: Player;
  playerGameStats?: PlayerGameStats;
  plateAppearances: Array<Play>;
}

const isHittingSplit = (split: Split): split is HittingGameLogSplit => {
  return split.type === 'gameLog' && split.group === 'hitting';
}

const getHittingStats = (stats?: PlayerGameStats): HittingGameLogSplit | undefined => {
  return stats?.stats
    .flatMap(stat => stat.splits)
    .find(isHittingSplit);
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  team,
  player,
  playerGameStats,
  plateAppearances,
}) => {
  const navigate = useNavigate();

  const hittingSummary = getHittingStats(playerGameStats);

  const onClose = () => navigate(-1);
  
  return (
    <Dialog.Root
      scrollBehavior="inside"
      size={{ mdDown: "cover", md: "md" }}
      open={true}
      onOpenChange={onClose}
      placement="center"
    > 
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Stack>
                <Dialog.Title>{player.person.fullName}</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
                <Flex>
                  <Text pr={2}>{player.allPositions.map(pos => pos.abbreviation).join(', ')}</Text>
                  <Separator orientation="vertical" />
                  <Text pl={2}>{team}</Text>
                </Flex>
              </Stack>    
            </Dialog.Header>
            { hittingSummary && (
              <Dialog.Body>
                <Section title="Season Stats">
                  <PlayerStats player={player} />
                </Section>
                <Separator />
                <Section title="Game Summary" mt={2}>
                  <Text fontSize="lg">{hittingSummary.stat.summary}</Text>
                </Section>
                <Separator />
                <Section title="Plate Appearances" mt={2}>
                  <PlateAppearances plateAppearances={plateAppearances} />
                </Section>
              </Dialog.Body>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PlayerCard;
