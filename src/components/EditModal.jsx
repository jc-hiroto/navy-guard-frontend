import React, { useEffect } from 'react'
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
  Spacer,
  HStack
} from "@chakra-ui/react";
import { getMemberbyId, getMemberQueuebyId, patchMemberbyId } from '../api/members';
import { ignoreTypeMap } from '../constants/mapping';
import { createQueue, deleteQueuebyId } from '../api/queues';

const token = sessionStorage.getItem('NAVY_GUARD_USER_TOKEN');
const scheduleData = {
  "1":[
    {
      id: 1,
      status: 1
    },
    {
      id: 2,
      status: 0
    }
  ],
  "2":[
    {
      id: 3,
      status: -1
    },
    {
      id: 4,
      status: 0
    }
  ],
  "3":[
    {
      id: 3,
      status: 0
    },
    {
      id: 4,
      status: 0
    }
  ],
  "4":[
    {
      id: 3,
      status: 0
    },
    {
      id: 4,
      status: 0
    }
  ],
  "5":[
    {
      id: 3,
      status: 0
    },
    {
      id: 4,
      status: 0
    }
  ],
  "6":[
    {
      id: 3,
      status: 0
    },
    {
      id: 4,
      status: 0
    }
  ],
  "7":[
    {
      id: 3,
      status: 0
    },
    {
      id: 4,
      status: 0
    }
  ],
  "8":[
    {
      id: 3,
      status: 0
    },
    {
      id: 4,
      status: 0
    }
  ],
}

function EditModal({ title, mode, isOpen, setIsOpen}) {
  const [ignoreDate, setIgnoreDate] = React.useState('');
  const [memberQueues, setMemberQueues] = React.useState([]);

  const [isSending, setIsSending] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState('');
  const [memberId, setMemberId] = React.useState('');
  const [memberData, setMemberData] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState('');
  useEffect(() => {
    console.log(memberId);
    async function fetchData() {
      if(!isNaN(memberId) && memberId.length === 3){
        // do search and fetch data
        switch(mode){
          case 2:
            try{
              const {queue} = await getMemberQueuebyId(memberId);
              if (queue) {
                setMemberQueues(queue);
              }else{
                setMemberData([]);
              }
            }catch(e){
              setMemberData(-1);
              setMemberQueues([]);
              console.log(e);
              return;
            }
          case 3:
            try{
              const {member} = await getMemberbyId(memberId);
              if (member) {
                setSelectedType(member.type);
                setMemberData(member);
              }else{
                setMemberData(null);
                setSelectedType('');
              }
            }catch(e){
              setMemberData(-1);
              console.log(e);
              return;
            }
        }
      }
    }
    fetchData();
  }, [memberId])

  const handleAddQueue = async () => {
    setIsSending(true);
    try{
      const req = {
        member_id: memberId,
        status: 0,
        skipped_date: ignoreDate,
      }
      const resp = await createQueue(req, token);
    }catch(e){
      setErrorCode(e.code);
    }
    setIsSending(false);
    setMemberData(null);
    setSelectedType('');
    setMemberId('');
    setErrorCode('');
  }

  const handleDeleteQueue = async () => {
    setIsSending(true);
    try{
      const resp = await deleteQueuebyId(selectedType, token);
    }catch(e){
      setErrorCode(e.code);
    }
    setIsSending(false);
    setMemberData(null);
    setSelectedType('');
    setMemberId('');
    setErrorCode('');
  };

  const handleUpdateMemberType = async () => {
    setIsSending(true);
    try{
      const resp = await patchMemberbyId(memberId, {type: selectedType}, token);
    }catch(e){
      setErrorCode(e.code);
    }
    setIsSending(false);
    setMemberData(null);
    setSelectedType('');
    setMemberId('');
    setErrorCode('');
  }
  const renderEditModalBody = () => {
    console.log(mode);
    switch(mode) {
      case 1:
        return(
          <>
          1
          </>
        );
      case 2:
        return(
          <>
          <ModalBody>
            <Flex w="100%" flexDirection="column" alignItems="start" justifyContent="center">
              <Flex w="100%" flexDirection="row" justifyContent="center" alignItems="center">
                <Input w="70%" h='100px' fontSize="4xl" color="blue.700" fontWeight="800" textAlign="center" placeholder="三碼學號" value={memberId} onChange={(e) => setMemberId(e.target.value)} maxLength="3"/>
              </Flex>
              {
                memberData && memberId.length === 3 ?
                memberData !== -1?
                <>
                  <Flex w="100%" flexDirection="column" justifyContent="center" alignItems="center">
                    <Text mt="8" mb="4" fontSize="2xl" fontWeight="500" color="gray.600">待補值更 </Text>
                    <Flex w="100%" flexDirection="row" justifyContent="center" alignItems="center" flexWrap="wrap" gap="10px">
                      <HStack>
                        <Input placeholder="YYYY-MM-DD" value={ignoreDate} onChange={(e) => setIgnoreDate(e.target.value)}/>
                        <Button colorScheme="blue" variant="solid" onClick={() => {handleAddQueue()}} isLoading={isSending} disabled={ignoreDate.length === 0}>加入</Button>
                      </HStack>
                    </Flex>
                    <Flex mt="8" w="100%" flexDirection="row" justifyContent="center" alignItems="center" flexWrap="wrap" gap="10px">
                      {
                        memberQueues.length > 0 ?
                        memberQueues.map((queue, index) => {
                          return(
                            <Button key={index} colorScheme="red" variant={selectedType == queue._id? "solid":"outline"} size="lg" onClick={() => setSelectedType(queue._id)}>
                              {new Date(queue.skipped_date).toLocaleDateString("zh-TW")}
                            </Button>
                          );
                        })
                        :
                        <Text fontSize="2xl" fontWeight="500" color="gray.600">無欠更</Text>
                      }
                    </Flex>
                  </Flex>
                </>
                :
                <Flex w="100%" flexDirection="column" justifyContent="center" alignItems="center">
                  <Text mt="8" mb="4" fontSize="2xl" fontWeight="500" color="red.700">查無此學號</Text>
                </Flex>
                :
                <></>
              }
              <Spacer />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" my='4' flexDirection="row" justifyContent="start" alignItems="center">
              {
                errorCode === "" ?
                <></>:
                <Text fontSize="sm" fontWeight="500" color="red.600">錯誤<br/>{errorCode}</Text>
              }
              <Spacer/>
              <Button colorScheme="blue" variant="solid" onClick={() => handleDeleteQueue()} isLoading={isSending} isDisabled={!memberData || memberData==-1 || memberId.length !== 3}>儲存</Button>
            </Flex>
          </ModalFooter>
          </>
        );
      case 3:
        return(
          <>
          <ModalBody>
            <Flex w="100%" flexDirection="column" alignItems="start" justifyContent="center">
              <Flex w="100%" flexDirection="row" justifyContent="center" alignItems="center">
                <Input w="70%" h='100px' fontSize="4xl" color="blue.700" fontWeight="800" textAlign="center" placeholder="三碼學號" value={memberId} onChange={(e) => setMemberId(e.target.value)} maxLength="3"/>
              </Flex>
              {
                memberData && memberId.length === 3 ?
                memberData !== -1?
                <>
                  <Flex w="100%" flexDirection="column" justifyContent="center" alignItems="center">
                    <Text mt="8" mb="4" fontSize="2xl" fontWeight="500" color="gray.600">身份選項 </Text>
                    <Flex w="100%" flexDirection="row" justifyContent="center" alignItems="center" flexWrap="wrap" gap="10px">
                      {
                        Object.keys(ignoreTypeMap).map((key, index) => {
                          return(
                            <Button key={index} colorScheme="teal" variant={selectedType == key? "solid":"outline"} size="lg" onClick={() => setSelectedType(key)}>
                              {ignoreTypeMap[key]}
                            </Button>
                          );
                        })
                      }
                    </Flex>
                  </Flex>
                </>
                :
                <Flex w="100%" flexDirection="column" justifyContent="center" alignItems="center">
                  <Text mt="8" mb="4" fontSize="2xl" fontWeight="500" color="red.700">查無此學號</Text>
                </Flex>
                :
                <></>
              }
              <Spacer />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" my='4' flexDirection="row" justifyContent="start" alignItems="center">
              {
                errorCode === ""?
                <></>:
                <Text fontSize="sm" fontWeight="500" color="red.600">錯誤<br/>{errorCode}</Text>
              }
              <Spacer/>
              <Button colorScheme="blue" variant="solid" onClick={() => handleUpdateMemberType()} isLoading={isSending} isDisabled={!memberData || memberData==-1 || memberId.length !== 3}>儲存</Button>
            </Flex>
          </ModalFooter>
          </>
        );
      default:
        return(
          <>
          
          </>
        );
    }
  };
  return(
    <>
      <Modal size="full" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="lg" fontWeight="800">{title}</Text>
          </ModalHeader>
          <ModalCloseButton />
          {renderEditModalBody()}
        </ModalContent>
      </Modal>
    </>
  );  // return
}

export default EditModal;