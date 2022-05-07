import { useState } from 'react'
import './App.css'
import {
  Flex,
} from "@chakra-ui/react";
import HomePageContainer from './containers/HomePageContainer'
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <HeaderBar />
      <HomePageContainer />
      <FooterBar />
    </Flex>
  )
}

export default App
