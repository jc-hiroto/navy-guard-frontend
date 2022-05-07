import React from "react";
import {
  Flex,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
  Badge,
  Progress,
  Button,
  Spacer
} from "@chakra-ui/react";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";
import { FaCheckCircle, FaInfoCircle, FaPen, FaQuestionCircle, FaRegCalendar, FaRegClock, FaTimesCircle, FaUserAlt } from "react-icons/fa";

function HomePageContainer() {
  const getFilledMemberId = (mid) => {
    return ('000' + mid).substr(-3);
  }
  const statusColorMap = {
    "0": "gray",
    "1": "green",
    "-1": "red"
  }
  const statusIconMap = {
    "0": FaQuestionCircle,
    "1": FaCheckCircle,
    "-1": FaTimesCircle
  }
  const ignoreTypeMap = {
    "exempt": "免值",
    "diner": "餐勤",
    "quarantine": "隔離",
    "occation": "請假",
    "hospitalized": "住院",
    "discharged": "退伍",
    "other": "其他"
  }
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
  const memberDateData = [
    {
      id: 1,
      dates: [
        "2022/05/01", "2022/05/03", "2022/03/28" 
      ]
    },
    {
      id: 3,
      dates: [
        "2022/05/01", "2022/05/03", "2022/03/28" 
      ]
    },
    {
      id: 4,
      dates: [
        "2022/05/01", "2022/05/03", "2022/03/28" 
      ]
    },
    {
      id: 6,
      dates: [
        "2022/05/01", "2022/05/03", "2022/03/28" 
      ]
    },
  ]

  const ignoreMemberData = {
    "exempt": [1],
    "diner": [2,4,29,31,32,47,49,51,60,75,77,85,86,87,88,90],
    "quarantine": [21],
    "occation": [],
    "hospitalized": [],
    "discharged": [20, 30, 53, 63, 73],
    "other": []
  }
  const MemberDateRow = (member) => {
    return(
      <>
        <Flex w="100%" my="1" flexDirection="row" justifyContent="start" alignItems="center">
          <Tag w="85px" mr="2" size="lg" variant='outline' colorScheme='gray'>
            <TagLeftIcon boxSize='12px' as={FaUserAlt} />
            <TagLabel fontWeight="800" fontSize="lg">{getFilledMemberId(member.id)}</TagLabel>
          </Tag>
          {
            member.dates.map((date, index) => {
              return(
                <Badge mx="0.5" key={index} colorScheme="red">{date.substr(-5)}</Badge>
              )})
          }
        </Flex>
      </>
    );
  };
  return (
      <Flex w="100%" px="8" py="4" minH="90vh" flexDirection="column" justifyContent="start" alignItems="center">
        <Flex w="100%" flexDirection="column" justifyContent="start" alignItems="start">
          <Text fontSize="3xl" fontWeight="800" color="gray.600">2022 年 5 月 7 日</Text>
          <Text fontSize="md" fontWeight="500" color="gray.400">距離退伍還有  天</Text>
        </Flex>
        <Flex w="100%" mt="8" flexDirection="column" justifyContent="start" alignItems="start">
          <Flex w="100%" alignItems="center">
            <Text fontSize="4xl" fontWeight="800" color="gray.600">本日衛兵</Text>
            <Spacer/>
            <Button leftIcon={<FaPen/>} size="sm" disabled>編輯</Button>
          </Flex>
          <Flex my="2" w="100%" alignItems="center">
            <Button mr="2" leftIcon={<FaRegClock/>} size="sm" variant="outline">歷史紀錄</Button>
            <Button mr="2" leftIcon={<FaRegCalendar/>} size="sm" variant="outline">本週預期衛兵</Button>
            <Button leftIcon={<FaInfoCircle/>} size="sm" variant="outline">規則</Button>
          </Flex>
          {/* guard panel section */}
          <Flex w="100%" px="4" py="2" flexDirection="column" justifyContent="start" alignItems="start" bg="gray.100" borderRadius="lg" boxShadow="md">
            <Flex w="100%" flexDirection="row" justifyContent="start" alignItems="center" flexWrap="wrap" css={{gap: "10px"}}>
              {Object.keys(scheduleData).map(key => {
                const obj = scheduleData[key];
                return(
                  <>
                    <Flex flexDirection="column" justifyContent="start" alignItems="start">
                      <Text mt="2" fontSize="lg" fontWeight="800" color="gray.600">第 {key} 更</Text>
                      {
                        obj.map((slot, index) => {
                          return(
                            <>
                              <Tag w="85px" my="1" size="lg" variant='solid' colorScheme={statusColorMap[slot.status]}>
                                <TagLeftIcon boxSize='12px' as={statusIconMap[slot.status]} />
                                <TagLabel fontWeight="800" fontSize="lg">{getFilledMemberId(slot.id)}</TagLabel>
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
          </Flex>
        </Flex>
        <Flex w="100%" mt="8" flexDirection="column" justifyContent="start" alignItems="start">
          <Flex w="100%" alignItems="center">
            <Text fontSize="4xl" fontWeight="800" color="gray.600">補值更表</Text>
            <Spacer/>
            <Button leftIcon={<FaPen/>} size="sm" disabled>編輯</Button>
          </Flex>
          <Flex w="100%" px="4" py="2" flexDirection="column" justifyContent="start" alignItems="start" bg="gray.100" borderRadius="lg" boxShadow="md">
            {memberDateData.map(member => {
              return(
                <>
                  {MemberDateRow(member)}
                </>
              );
            })}
          </Flex>
        </Flex>
        <Flex w="100%" mt="8" flexDirection="column" justifyContent="start" alignItems="start">
          <Flex w="100%" alignItems="center">
            <Text fontSize="4xl" fontWeight="800" color="gray.600">免值更名單</Text>
            <Spacer/>
            <Button leftIcon={<FaPen/>} size="sm" disabled>編輯</Button>
          </Flex>
          <Flex w="100%" px="4" py="2" flexDirection="column" justifyContent="start" alignItems="start" bg="gray.100" borderRadius="lg" boxShadow="md">
            {Object.keys(ignoreMemberData).map(key => {
              return(
                <>
                  <Flex w="100%" my="1" flexDirection="row" justifyContent="start" alignItems="center">
                    <Tag w="80px" mr="2" size="lg" variant='outline' colorScheme='gray'>
                      <TagLeftIcon boxSize='12px' as={FaUserAlt} />
                      <TagLabel fontWeight="800">{ignoreTypeMap[key]}</TagLabel>
                    </Tag>
                    <Flex w="70%" flexDirection="row" justifyContent="start" alignItems="start" overflow="scroll">
                      {
                        ignoreMemberData[key].map((mid, index) => {
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
        </Flex>
      </Flex>
  );
};

export default HomePageContainer;
