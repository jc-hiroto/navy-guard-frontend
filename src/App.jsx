import React, { useEffect } from 'react'
import './App.css'
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Text,
  Spacer
} from "@chakra-ui/react";
import HomePageContainer from './containers/HomePageContainer'
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import { getAccessToken } from './api/auth';

function App() {
  const [signInModalIsOpen, setSignInModalIsOpen] = React.useState(false);
  const [signInModalIsLoading, setSignInModalIsLoading] = React.useState(false);
  const [signInId, setSignInId] = React.useState('');
  const [signInPassword, setSignInPassword] = React.useState('');
  const [signInErrorCode, setSignInErrorCode] = React.useState("");
  const [isSignedIn, setIsSignedIn] = React.useState(false);


  useEffect(() => {
    // check token from localStorage
    const token = sessionStorage.getItem('NAVY_GUARD_USER_TOKEN');
    if (token) {
      setIsSignedIn(true);
    }else{
      setIsSignedIn(false);
      sessionStorage.removeItem('NAVY_GUARD_USER_TOKEN');
    }
  }, []);

  const handleSignIn = async () => {
    setSignInErrorCode("");
    setSignInModalIsLoading(true);
    console.log(signInId, signInPassword);
    try{
      const {data:{token}} = await getAccessToken(signInId, signInPassword);
      if (token) {
        sessionStorage.setItem('NAVY_GUARD_USER_TOKEN', token);
        setIsSignedIn(true);
      }else{
        setIsSignedIn(false);
      }
    }catch(e){
      setSignInErrorCode(e.code);
      console.log(signInErrorCode);
      setSignInModalIsLoading(false);
      return;
    }
    setSignInErrorCode("");
    setSignInId('');
    setSignInPassword('');
    setSignInModalIsLoading(false);
    setSignInModalIsOpen(false);
  };

  const handleSignOut = () => {
    setSignInModalIsLoading(true);
    sessionStorage.removeItem('NAVY_GUARD_USER_TOKEN');
    setSignInId('');
    setSignInPassword('');
    setSignInModalIsLoading(false);
    setIsSignedIn(false);
    window.location.reload();
  };

  const loginModal = () => {
    return(
      <>
        <Modal isOpen={signInModalIsOpen} onClose={() => setSignInModalIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text fontSize="lg" fontWeight="800">管理者登入</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex w="100%" flexDirection="column" alignItems="start">
                <Text mt='4' mb='2' fontSize="lg" fontWeight="800">帳號</Text>
                <Input placeholder="請輸入帳號" value={signInId} onChange={(e) => setSignInId(e.target.value)} type="email" />
                <Text mt='4' mb='2' fontSize="lg" fontWeight="800">密碼</Text>
                <Input placeholder="請輸入密碼" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} type="password"/>
                <Flex w="100%" my='4' flexDirection="row" justifyContent="start" alignItems="center">
                  {
                    signInErrorCode === ""?
                    <></>:
                    <Text fontSize="sm" fontWeight="500" color="red.600">錯誤<br/> {signInErrorCode}</Text>
                  }
                  <Spacer/>
                  <Button mr='2' colorScheme="gray" variant="outline" onClick={() => {setSignInModalIsOpen(false); setSignInErrorCode("");}}>取消</Button>
                  <Button colorScheme="blue" variant="solid" onClick={() => handleSignIn()} isLoading={signInModalIsLoading} isDisabled={signInId === '' || signInPassword === ''}>登入</Button>
                </Flex>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <HeaderBar setSignInModalIsOpen={setSignInModalIsOpen} isSignedIn={isSignedIn} handleSignOut={handleSignOut}/>
      {loginModal()}
      <HomePageContainer isSignedIn={isSignedIn}/>
      <FooterBar />
    </Flex>
  )
}

export default App
