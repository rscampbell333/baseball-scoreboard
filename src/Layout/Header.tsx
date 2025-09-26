import { Flex, IconButton, Menu, Portal, Spacer } from "@chakra-ui/react";
import { LuArrowLeft, LuMenu } from "react-icons/lu";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex paddingX="3">
      {
        location.pathname !== '/' && (
        <IconButton variant="ghost" onClick={() => navigate(-1)}>
          <LuArrowLeft />
        </IconButton>
      )}
      <Spacer />
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton variant="ghost">
            <LuMenu />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="home" asChild>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item value="standings" asChild>
                <Link to="/standings">Standings</Link>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
};

export default Header;
