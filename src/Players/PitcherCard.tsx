import type {
  Player,
} from "@/mlbApi/types";
import {
  Box,
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
import { useNavigate } from "react-router";

interface PitcherCardProps {
  team: string;
  player: Player;
}

const PitcherCard: React.FC<PitcherCardProps> = ({
  team,
  player,
}) => {
  const navigate = useNavigate();

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
            <Dialog.Body>
              <Section title="Season Stats">
                <Box>
                  <PlayerStats stats={[
                    {label: 'ERA', helpText: 'Earned Run Average', value: player.seasonStats.pitching.era },
                    {label: 'WHIP', helpText: 'Walks plus Hits per Inning Pitched', value: player.seasonStats.pitching.whip },
                    {label: 'IP', helpText: 'Innings Pitched', value: player.seasonStats.pitching.inningsPitched },
                  ]}/>
                </Box>
                <Box pt={2}>
                  <PlayerStats stats={[
                    { label: 'W', helpText: 'Wins', value: player.seasonStats.pitching.wins },
                    { label: 'L', helpText: 'Losses', value: player.seasonStats.pitching.losses },
                    { label: 'GP', helpText: 'Games Played', value: player.seasonStats.pitching.gamesPlayed },
                  ]}/>
                </Box>
              </Section>
              <Section title="Game Stats">
                <Box>
                  <PlayerStats stats={[
                    { label: 'IP', helpText: 'Innings Pitched', value: player.stats.pitching.inningsPitched },
                    { label: 'R', helpText: 'Runs', value: player.stats.pitching.runs },
                    { label: 'ER', helpText: 'Earned Runs', value: player.stats.pitching.earnedRuns },
                  ]}/>
                </Box>
                <Box pt={2}>
                  <PlayerStats stats={[
                    { label: 'H', helpText: 'Hits', value: player.stats.pitching.hits },
                    { label: 'K', helpText: 'Runs', value: player.stats.pitching.strikeOuts },
                    { label: 'BB', helpText: 'Walks', value: player.stats.pitching.baseOnBalls },
                  ]}/>
                </Box>
              </Section>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PitcherCard;
