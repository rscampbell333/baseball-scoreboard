import { Box, Separator } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import Header from "./Header";

const PageWrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <Box>
    <Header />
    <Separator />
    {children}
  </Box>
);

export default PageWrapper;
