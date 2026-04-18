import { InfoTip } from "@/components/ui/toggle-tip";
import { Stat } from "@chakra-ui/react";

interface PlayerStatProps {
  label: string;
  value: string | number;
  helpText?: string;
}

const PlayerStat: React.FC<PlayerStatProps> = ({
  label,
  value,
  helpText,
}) => (
  <Stat.Root>
    <Stat.Label>{label}
      {helpText && <InfoTip>{helpText}</InfoTip>}
    </Stat.Label>
    <Stat.ValueText>{value}</Stat.ValueText>
  </Stat.Root>
);

export default PlayerStat;
