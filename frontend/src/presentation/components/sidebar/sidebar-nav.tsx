import React from "react"
import { type Logout } from "@/domain/usecases"
import { type AuthenticationState } from "@/data/protocols/state-manager"
import { useAppSelector } from "@/main/providers"
import { PokemonLogo } from "@/presentation/components"
import {
  Box,
  Flex,
  type FlexProps,
  IconButton,
  useColorModeValue,
  HStack,
  Menu,
  MenuButton,
  VStack,
  Text,
  MenuList,
  MenuItem
} from "@chakra-ui/react"
import { FiMenu } from "react-icons/fi"

interface MobileProps extends FlexProps {
  onOpen: () => void
  authentication: Logout
}

const MobileNav: React.FC<MobileProps> =
  ({ onOpen, authentication, ...rest }) => {
    const {
      user
    }: AuthenticationState = useAppSelector((state) => state.authentication)

    const handleLogout = async (): Promise<void> => {
      await authentication.logout()
    }

    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Box display={{ base: "flex", md: "none" }}>
          <PokemonLogo />
        </Box>

        <HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}>
                <HStack>
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                  >
                    <Text fontSize="sm">{user?.name}</Text>
                  </VStack>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    )
  }

export default MobileNav
