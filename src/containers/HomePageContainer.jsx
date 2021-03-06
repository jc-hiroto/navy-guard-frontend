import React, { useEffect } from "react";
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
import { ignoreTypeMap, statusColorMap, statusIconMap } from "../constants/mapping";
import { getFilledMemberId, get_days_left, get_now_date } from "../utils";
import { get_day_prediction, get_schedule_by_date } from "../api/schedules";
import { getLeftQueues } from "../api/queues";
import { getIgnoreMembers } from "../api/members";

function HomePageContainer({ isSignedIn }) {

  const [editModalisOpen, setEditModalisOpen] = React.useState(false);
  const [editModalState, setEditModalState] = React.useState(0);
  const [scheduleData, setScheduleData] = React.useState({});
  const [queueData, setQueueData] = React.useState({});
  const [ignoreData, setIgnoreData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [scheduleIsVerified, setScheduleIsVerified] = React.useState(false);


  const fetchScheduleData = async () => {
    try{
      const sche = await get_schedule_by_date(new Date().toISOString().split('T')[0]);
      if (sche && sche.schedule) {
        console.log("schedule: ", sche.schedule);
        setScheduleData(sche.schedule);
        setScheduleIsVerified(true);
      }else{
        console.log("schedule is not verified");
        setScheduleIsVerified(false);
        const p_sche = await get_day_prediction();
        if (p_sche && p_sche.schedule) {
          setScheduleData(p_sche.schedule);
        }
      }
    }catch(e){
      console.log(e);
    }
  };

  const fetchQueueData = async () => {
    try{
      const q = await getLeftQueues();
        if (q && q.members) {
          console.log("queue: ", q.members);
          setQueueData(q.members);
        }
    }catch(e){
      console.log(e);
    }
  }

  const fetchIgnoreData = async () => {
    try{
      const ig = await getIgnoreMembers();
      if (ig && ig.members) {
        console.log("ignore: ", ig.members);
        setIgnoreData(ig.members);
      }
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    async function fetchData() {
      console.log("fetching data...");
      setIsLoading(true);
      await fetchScheduleData();
      await fetchQueueData();
      await fetchIgnoreData();
      setIsLoading(false);
      console.log("fetching data done");
    }
    fetchData();
  } , []);

  const MemberDateRow = (member) => {
    return(
      <>
        <Flex w="100%" my="1" flexDirection="row" justifyContent="start" alignItems="center">
          <Tag w="85px" mr="2" size="lg" variant='outline' colorScheme='gray'>
            <TagLeftIcon boxSize='12px' as={FaUserAlt} />
            <TagLabel fontWeight="800" fontSize="lg">{getFilledMemberId(member[0].member_id)}</TagLabel>
          </Tag>
          <Flex w="70%" flexDirection="row" justifyContent="start" alignItems="start" overflow="scroll">
          {
            member.map((date, index) => {
              return(
                <Badge mx="0.5" key={index} colorScheme="red">{date.skipped_date.substr(0,10)}</Badge>
              )})
          }
          </Flex>
        </Flex>
      </>
    );
  };

  const scheduleTable = () => {
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
            {Object.keys(scheduleData["main"]).map(key => {
              const obj = scheduleData["main"][key];
              return(
                <>
                  <Flex flexDirection="column" justifyContent="start" alignItems="start">
                    <Text mt="2" fontSize="lg" fontWeight="800" color="gray.600">??? {key} ???</Text>
                    {
                      obj.map((slot, index) => {
                        return(
                          scheduleIsVerified?
                          <>
                            <Tag as="button" disabled={!isSignedIn} w="85px" my="1" size="lg" variant='solid' colorScheme={statusColorMap[slot.status]}>
                              <TagLeftIcon boxSize='12px' as={statusIconMap[slot.status]} />
                              <TagLabel fontWeight="800" fontSize="lg">{getFilledMemberId(slot.id)}</TagLabel>
                            </Tag>
                          </>
                          :
                          <>
                            <Tag w="85px" my="1" size="lg" variant='solid' colorScheme="gray">
                              <TagLeftIcon boxSize='12px' as={statusIconMap["0"]} />
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
              <Text mt="2" fontSize="lg" fontWeight="800" color="gray.600">?????????</Text>
                <Flex w="100%" flexDirection="row" justifyContent="start" alignItems="center" flexWrap="wrap" css={{gap: "10px"}}>
    
                {
                  scheduleData["pre"].map(obj => {
                    return(
                      scheduleIsVerified?
                      <>
                        <Tag as="button" disabled={!isSignedIn} w="85px" size="lg" variant='solid' colorScheme="gray">
                          <TagLeftIcon boxSize='12px' as={statusIconMap["0"]} />
                          <TagLabel fontWeight="800" fontSize="lg">{getFilledMemberId(obj.id)}</TagLabel>
                        </Tag>
                      </>
                      :
                      <>
                        <Tag as="button" disabled={!isSignedIn} w="85px" size="lg" variant='solid' colorScheme="gray">
                          <TagLeftIcon boxSize='12px' as={statusIconMap["0"]} />
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
  };

  const renderIgnoreMemberPanel = () => {
    if(isLoading){
      return(
        <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
          <Text fontSize="2xl" fontWeight="800">Loading...</Text>
        </Flex>
      );
    }
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

  const renderQueuePanel = () => {
    if(isLoading){
      return(
        <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
          <Text fontSize="2xl" fontWeight="800">Loading...</Text>
        </Flex>
      );
    }
    return(
      <Flex w="100%" px="4" py="2" flexDirection="column" justifyContent="start" alignItems="start" bg="gray.100" borderRadius="lg" boxShadow="md">
        {Object.keys(queueData).map(key => {
          const member = queueData[key];
          return(
            <>
              {MemberDateRow(member)}
            </>
          );
        })}
      </Flex>
    );
  };

  return (
      <Flex w="100%" px="8" py="4" minH="90vh" flexDirection="column" justifyContent="start" alignItems="center">
        <EditModal title="??????" mode={editModalState} isOpen={editModalisOpen} setIsOpen={setEditModalisOpen} ignoreData={ignoreData}/>
        <Flex w="100%" flexDirection="column" justifyContent="start" alignItems="start">
          <Text fontSize="3xl" fontWeight="800" color="gray.600">{get_now_date()[0]} ??? {get_now_date()[1]} ??? {get_now_date()[2]} ???</Text>
          <Text fontSize="md" fontWeight="500" color="gray.400">?????????????????? {get_days_left()} ??????????????? {Math.floor((112-get_days_left())/112*100)} %</Text>
        </Flex>
        <Flex w="100%" mt="8" flexDirection="column" justifyContent="start" alignItems="start">
          <Flex w="100%" alignItems="center">
            <Text fontSize="4xl" fontWeight="800" color="gray.600">????????????</Text>
            <Spacer/>
            <Button leftIcon={<FaPen/>} size="sm" disabled={!isSignedIn} onClick={() => {setEditModalisOpen(true); setEditModalState(1);}}>??????</Button>
          </Flex>
          <Flex my="2" w="100%" alignItems="center">
            <Button mr="2" leftIcon={<FaRegClock/>} size="sm" variant="outline" disabled>????????????</Button>
            <Button mr="2" leftIcon={<FaRegCalendar/>} size="sm" variant="outline">??????????????????</Button>
          </Flex>
          {/* guard panel section start*/}
          {scheduleTable()}
          {/* guard panel section end */}
        </Flex>
        <Flex w="100%" mt="8" flexDirection="column" justifyContent="start" alignItems="start">
          <Flex w="100%" alignItems="center">
            <Text fontSize="4xl" fontWeight="800" color="gray.600">????????????</Text>
            <Spacer/>
            <Button leftIcon={<FaPen/>} size="sm" disabled={!isSignedIn} onClick={() => {setEditModalisOpen(true); setEditModalState(2);}}>??????</Button>
          </Flex>
          {renderQueuePanel()}
        </Flex>
        <Flex w="100%" mt="8" flexDirection="column" justifyContent="start" alignItems="start">
          <Flex w="100%" alignItems="center">
            <Text fontSize="4xl" fontWeight="800" color="gray.600">???????????????</Text>
            <Spacer/>
            <Button leftIcon={<FaPen/>} size="sm" disabled={!isSignedIn} onClick={() => {setEditModalisOpen(true); setEditModalState(3);}}>??????</Button>
          </Flex>
          {renderIgnoreMemberPanel()}
        </Flex>
      </Flex>
  );
};

export default HomePageContainer;
