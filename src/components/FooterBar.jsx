import { Flex, Text, ButtonGroup, IconButton, HStack, Icon, Spacer } from '@chakra-ui/react';
import { FaAnchor, FaCodeBranch, FaGithub } from 'react-icons/fa';

function FooterBar() {
    const ver = "beta (20220507)"
    const handleOpenPage = (page) => {
        window.open(page, '_blank');
    };
    return (
        <Flex w="100%" flexDirection="row" flexWrap="wrap" justifyContent="center" alignItems="start" px="4" py="2" borderTop="1px solid" borderColor="gray.200" zIndex="9999" css={{gap: "10px"}}>
            {
                <>
                    <Flex w="100%" flexDirection="row" justifyContent="start" alignItems="center">
                      <Icon mx="2" as={FaAnchor} color="gray.500"></Icon>
                      <Text fontSize="xs" color="gray.500" fontWeight="600">線上衛兵表</Text>
                      <Spacer />
                      <HStack>
                          <Icon as={FaCodeBranch} color="gray.300" size="4"></Icon>
                          <Text fontSize="xs" color="gray.300" fontWeight="600">{ver}</Text>
                      </HStack>
                      <Spacer />
                      <ButtonGroup spacing="2">
                          <IconButton size="sm" variant="ghost" color="gray.400" icon={<FaGithub size="20"/>} mx="1" onClick={() => handleOpenPage("https://github.com/jc-hiroto/navy-guard-frontend")} />
                      </ButtonGroup>
                    </Flex>
                </>
            }
        </Flex>
    );
}
export default FooterBar;