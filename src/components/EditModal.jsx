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
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Badge,

} from "@chakra-ui/react";
import { getFilledMemberId } from '../utils';
import { getMemberbyId, getMemberQueuebyId, patchMemberbyId } from '../api/members';
import { ignoreTypeMap, statusColorMap, statusIconMap } from '../constants/mapping';
import { createQueue, deleteQueuebyId } from '../api/queues';
import { createSchedule, get_day_prediction } from '../api/schedules';
import { FaUserAlt } from 'react-icons/fa';

const token = sessionStorage.getItem('NAVY_GUARD_USER_TOKEN');
const schedule = {
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

function EditModal({ title, mode, isOpen, setIsOpen, ignoreData}) {
  const [ignoreDate, setIgnoreDate] = React.useState('');
  const [memberQueues, setMemberQueues] = React.useState([]);
  const [schedule, setSchedule] = React.useState({});
  const [verifiedSchedule, setVerifiedSchedule] = React.useState({});
  const [verifiedPre, setVerifiedPre] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState('');
  const [memberId, setMemberId] = React.useState('');
  const [memberData, setMemberData] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState('');


  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      console.log("get prediction");
      const p_sche = await get_day_prediction()
      if (p_sche && p_sche.schedule) {
        console.log(p_sche);
        setSchedule(p_sche.schedule);
        setVerifiedSchedule({"_id": p_sche.schedule._id, "main":{"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": []}, "pre": []})
      }
      setIsLoading(false);
    }
    fetchData();
  } , []);

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

  const renderIgnoreMemberPanel = () => {
    return(
      <Flex w="100%" px="4" py="2" flexDirection="column" justifyContent="start" alignItems="start" bg="gray.100" borderRadius="lg" boxShadow="md">
        {Object.keys(ignoreData).map(key => {
          return(
            <>
              <Flex w="100%" my="1" flexDirection="row" justifyContent="start" alignItems="center">
                <Tag w="80px" mr="2" size="lg" variant='outline' colorScheme='gray'>
                  <TagLeftIcon boxSize='12px' as={FaUserAlt} />
                  <TagLabel fontWeight="800">{ignoreTypeMap[key]}</TagLabel>
                </Tag>
                <Flex w="70%" flexDirection="row" justifyContent="start" alignItems="start" overflow="scroll">
                  {
                    ignoreData[key].map((mid, index) => {
                      return(
                        <Badge mx="0.5" key={index} colorScheme="green" size="lg">{getFilledMemberId(mid)}</Badge>
                      )
                    })
                  }
                </Flex>
              </Flex>
            </>
          );
        })}
      </Flex>
    );
  };

  const renderSchedule = () => {
    const handleVerify = (type, time, mid) => {
      const s = {...verifiedSchedule};
      if (s[type][time].includes(mid)){
        s[type][time] = s[type][time].filter(m => m !== mid);
      }else{
        s[type][time].push(mid);
      }
      setVerifiedSchedule(s);
    };
    const handleVerifyPre = (mid) => {
      if (verifiedPre.includes(mid)){
        setVerifiedPre(verifiedPre.filter(m => m !== mid));
      }else{
        setVerifiedPre([...verifiedPre, mid]);
      }
    };

    const isVerified = (mid) => {
      const s = {...verifiedSchedule};
      for (let key in s.main) {
        if (s.main[key].includes(mid)){
          return true;
        }
      }
      return false;
    };
    
    const isVerifiedPre = (mid) => {
      return verifiedPre.includes(mid);
    };

    if(isLoading){
      return(
        <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
          <Text fontSize="2xl" fontWeight="800">Loading...</Text>
        </Flex>
      );
    }
    return(
      <>
        <Flex w="100%" px="4" py="2" flexDirection="column" justifyContent="start" alignItems="start" bg="gray.100" borderRadius="lg" boxShadow="md">
          <Flex w="100%" flexDirection="row" justifyContent="start" alignItems="center" flexWrap="wrap" css={{gap: "10px"}}>
            {Object.keys(schedule["main"]).map(key => {
              const obj = schedule["main"][key];
              return(
                <>
                  <Flex flexDirection="column" justifyContent="start" alignItems="start">
                    <Text mt="2" fontSize="lg" fontWeight="800" color="gray.600">第 {key} 更</Text>
                    {
                      obj.map((slot, index) => {
                        return(
                          <>
                            <Tag as="button" w="85px" my="1" size="lg" variant='solid' colorScheme={isVerified(slot) ? "green":"gray"} onClick={() => handleVerify("main", key, slot)}>
                              <TagLeftIcon boxSize='12px' as={isVerified(slot) ? statusIconMap["1"]:statusIconMap["0"]} />
                              <TagLabel fontWeight="800" fontSize="lg">{getFilledMemberId(slot)}</TagLabel>
                            </Tag>
                          </>
                        );
                      })
                    }  
                  </Flex>
                </>
              );
            })}
          </Flex>
          {
              <Flex flexDirection="column" justifyContent="start" alignItems="start">
                <Text mt="2" fontSize="lg" fontWeight="800" color="gray.600">預備更</Text>
                  <Flex w="100%" flexDirection="row" justifyContent="start" alignItems="center" flexWrap="wrap" css={{gap: "10px"}}>
      
                  {
                    schedule["pre"].map(obj => {
                      return(
                        <>
                          <Tag as="button" w="85px" size="lg" variant='solid' colorScheme={isVerifiedPre(obj) ? "green":"gray"} onClick={() => handleVerifyPre(obj)}>
                            <TagLeftIcon boxSize='12px' as={isVerifiedPre(obj) ? statusIconMap["1"]:statusIconMap["0"]} />
                            <TagLabel fontWeight="800" fontSize="lg">{getFilledMemberId(obj)}</TagLabel>
                          </Tag>
                        </>
                        
                      );
                    })
                  }
                </Flex>
              </Flex>
          }
        </Flex>
      </>
    );
  }

  const handleSubmitSchedule = async () => {
    let data = {"_id": verifiedSchedule._id, "main":{"1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": []}, "pre": []};
    for (let key in verifiedSchedule["main"]) {
      for (let id of verifiedSchedule["main"][key]) {
        data["main"][key].push({"id": id, "status": 0});
      }
    }
    for (let id of verifiedPre) {
      data["pre"].push({"id": id, "status": 0});
    }
    console.log(data);
    const resp = await createSchedule(data, token);
  }

  const renderEditScheduleBody = () => {
    return(
      <>
        <ModalBody>
          {renderSchedule()}
          <Flex my="2"></Flex>
          <Text fontSize="2xl" fontWeight="800" color="gray.600">免值更名單</Text>
          {renderIgnoreMemberPanel()}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" variant="solid" onClick={() => handleSubmitSchedule()}>確認</Button>
        </ModalFooter>
      </>
    );
  }
  const renderEditModalBody = () => {
    switch(mode) {
      case 1:
        return(
          <>
            {renderEditScheduleBody()}
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