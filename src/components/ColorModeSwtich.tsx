import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwtich = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack padding="10px">
      <Switch
        colorScheme="green"
        onChange={toggleColorMode}
        isChecked={colorMode === "dark"}
      />
      <Text whiteSpace="nowrap">Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwtich;
