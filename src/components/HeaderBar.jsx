import React from "react";
import {
  Flex,
  HStack,
  Text,
  Icon,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FaAnchor, FaLock, FaSignInAlt } from "react-icons/fa";

function HeaderBar() {
  return(
    <>
      <Flex px="6" w="100%" h="64px" bg="blue.800" justifyContent="start" alignItems="center">
        <HStack>
          <Icon as={FaAnchor} color="white" boxSize={6}></Icon>
          <Text fontSize="2xl" fontWeight="800" color="white">線上衛兵表</Text>
        </HStack>
        <Spacer />
        <IconButton size="md" variant="solid" colorScheme="blue" icon={<FaLock/>}/>
      </Flex>
    </>
  );
}

export default HeaderBar;