import { Flex, IconButton, Spacer } from "@chakra-ui/react";
import { LuArrowLeft, LuMenu } from "react-icons/lu";
import { useLocation } from "react-router";
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
      <IconButton variant="ghost">
        <LuMenu />
      </IconButton>
    </Flex>
  );
};

export default Header;
