import React from "react";
import {
  Flex,
  Text
} from "@chakra-ui/react";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";

function HomePageContainer() {
  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <HeaderBar />
      <Flex w="100%" minH="90vh" flexDirection="column" justifyContent="center" alignItems="center">
      
      </Flex>
      <FooterBar />
    </Flex>
  );
};

export default HomePageContainer;
