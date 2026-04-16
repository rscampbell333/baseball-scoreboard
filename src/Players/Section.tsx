import { Box, Heading, type JsxStyleProps } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

interface SectionProps {
  title: string;
}

const Section: React.FC<SectionProps & PropsWithChildren & JsxStyleProps> = ({
  title,
  children,
  ...styleProps
}) => (
  <Box mb="3" {...styleProps}>
    <Heading size="md" pb="2">{title}</Heading>
    {children}
  </Box>
);

export default Section;
