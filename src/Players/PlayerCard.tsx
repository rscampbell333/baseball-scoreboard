import type { Player } from "@/mlbApi/types";
import {
  Badge,
  CloseButton,
  Dialog,
  Portal,
  Text,
} from "@chakra-ui/react";
import Section from "./Section";
import PlayerStats from "./PlayerStats";
import PlateAppearances from "./PlateAppearances";
import { Link, useNavigate } from "react-router";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const navigate = useNavigate();
  
  return (
    <Dialog.Root size="cover" open={true}> 
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{player.person.fullName}</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={() => navigate(-1)} />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <Section title="Season Stats">
                <PlayerStats player={player} />
              </Section>
              <Section title="Plate Appearances">
                <PlateAppearances player={player} />
              </Section>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PlayerCard;
