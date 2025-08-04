import React, { type ReactNode } from "react"
import MobileNav from "./sidebar-nav"
import SidebarContent from "./sidebar-content"
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure
} from "@chakra-ui/react"
import { makeRemoteLogout } from "@/main/factories/usecases"

interface SidebarProps {
  children?: ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({
  children
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} authentication={makeRemoteLogout()} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

export default Sidebar
