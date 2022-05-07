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
  Spacer,
  
} from "@chakra-ui/react";
import { FaInfoCircle, FaPen, FaRegCalendar, FaRegClock, FaUserAlt } from "react-icons/fa";
import EditModal from "../components/EditModal";
import ScheduleTable from "../components/ScheduleTable";
import { ignoreTypeMap } from "../constants/mapping";
import { getFilledMemberId, get_days_left, get_now_date } from "../utils";

function HomePageContainer({ isSignedIn }) {

  const [editModalisOpen, setEditModalisOpen] = React.useState(false);
  const [editModalState, setEditModalState] = React.useState(0);

  
  const scheduleData = {
    "main":{
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
    },
    "pre": [
      {
        id: 3,
        status: 1
      },
      {
        id: 4,
        status: -1
      },
      {
        id: 5,
        status: -1
      },
      {
        id: 6,
        status: -1
      },
      {
        id: 7,
        status: -1
      }
    ]
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
        <EditModal title="編輯" mode={editModalState} isOpen={editModalisOpen} setIsOpen={setEditModalisOpen} />
        <Flex w="100%" flexDirection="column" justifyContent="start" alignItems="start">
          <Text fontSize="3xl" fontWeight="800" color="gray.600">{get_now_date()[0]} 年 {get_now_date()[1]} 月 {get_now_date()[2]} 日</Text>
          <Text fontSize="md" fontWeight="500" color="gray.400">距離退伍還有 {get_days_left()} 天，已完成 {Math.floor((112-get_days_left())/112*100)} %</Text>
        </Flex>
        <Flex w="100%" mt="8" flexDirection="column" justifyContent="start" alignItems="start">
          <Flex w="100%" alignItems="center">
            <Text fontSize="4xl" fontWeight="800" color="gray.600">本日衛兵</Text>
            <Spacer/>
            <Button leftIcon={<FaPen/>} size="sm" disabled={!isSignedIn} onClick={() => {setEditModalisOpen(true); setEditModalState(1);}}>編輯</Button>
          </Flex>
          <Flex my="2" w="100%" alignItems="center">
            <Button mr="2" leftIcon={<FaRegClock/>} size="sm" variant="outline">歷史紀錄</Button>
            <Button mr="2" leftIcon={<FaRegCalendar/>} size="sm" variant="outline">未來預期衛兵</Button>
          </Flex>
          {/* guard panel section start*/}
          <ScheduleTable schedule={scheduleData} isSignedIn={isSignedIn}/>
          {/* guard panel section end */}
        </Flex>
        <Flex w="100%" mt="8" flexDirection="column" justifyContent="start" alignItems="start">
          <Flex w="100%" alignItems="center">
            <Text fontSize="4xl" fontWeight="800" color="gray.600">補值更表</Text>
            <Spacer/>
            <Button leftIcon={<FaPen/>} size="sm" disabled={!isSignedIn} onClick={() => {setEditModalisOpen(true); setEditModalState(2);}}>編輯</Button>
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
            <Button leftIcon={<FaPen/>} size="sm" disabled={!isSignedIn} onClick={() => {setEditModalisOpen(true); setEditModalState(3);}}>編輯</Button>
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
