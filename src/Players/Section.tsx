import { Box, Heading } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

interface SectionProps {
  title: string;
}

const Section: React.FC<SectionProps & PropsWithChildren> = ({
  title,
  children
}) => (
  <Box mb="3">
    <Heading size="md" pb="2">{title}</Heading>
    {children}
  </Box>
);

export default Section;
