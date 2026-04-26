import {
  Flex,
  Separator,
  Text,
  type JsxStyleProps,
} from "@chakra-ui/react";
import type React from "react";

interface ColumnProps {
  label?: string;
  awayValue?: string | number;
  homeValue?: string | number;
};

const Column: React.FC<ColumnProps & JsxStyleProps> = ({
  label,
  awayValue,
  homeValue,
  direction,
  ...styleProps
}) => (
  <Flex
    direction="column"
    textAlign="center"
    {...styleProps}
  >
    <Text whiteSpace="pre">{label !== undefined ? label : ' '}</Text>
    <Separator />
    <Text whiteSpace="pre">{awayValue !== undefined ? awayValue : ' '}</Text>
    <Text whiteSpace="pre">{homeValue !== undefined ? homeValue : ' '}</Text>
  </Flex>
);

export default Column;
