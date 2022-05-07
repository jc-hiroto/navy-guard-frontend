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

import { statusColorMap, statusIconMap } from "../constants/mapping";
import { getFilledMemberId } from "../utils";


function ScheduleTable({schedule, isSignedIn}) {
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
                          <Tag as="button" disabled={!isSignedIn} w="85px" my="1" size="lg" variant='solid' colorScheme={statusColorMap[slot.status]}>
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
          <Flex flexDirection="column" justifyContent="start" alignItems="start">
            <Text mt="2" fontSize="lg" fontWeight="800" color="gray.600">預備更</Text>
            <Flex w="100%" flexDirection="row" justifyContent="start" alignItems="center" flexWrap="wrap" css={{gap: "10px"}}>

            {
              schedule["pre"].map(obj => {
                return(
                  <>
                    <Tag as="button" disabled={!isSignedIn} w="85px" size="lg" variant='solid' colorScheme={statusColorMap[obj.status]}>
                      <TagLeftIcon boxSize='12px' as={statusIconMap[obj.status]} />
                      <TagLabel fontWeight="800" fontSize="lg">{getFilledMemberId(obj.id)}</TagLabel>
                    </Tag>
                  </>
                );
              })
            }
          </Flex>
        </Flex>

      </Flex>
    </>
  );
};

export default ScheduleTable;