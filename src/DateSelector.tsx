import { Flex, IconButton, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export interface DateSelectorProps {
  date: Date;
  onSelect: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, onSelect }) => {
  const addDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    onSelect(newDate);
  };

  const subtractDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    onSelect(newDate);
  };


  return (
    <Flex alignItems="center">
      <IconButton variant="ghost" onClick={subtractDay}>
        <LuChevronLeft />
      </IconButton>
      <Text marginTop=".25em">
        {date.toLocaleDateString()}
      </Text>
      <IconButton variant="ghost" onClick={addDay}>
        <LuChevronRight />
      </IconButton>
    </Flex>
  );
};

export default DateSelector;
