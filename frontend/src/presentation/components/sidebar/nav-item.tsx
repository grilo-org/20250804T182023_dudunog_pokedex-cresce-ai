import React, { type ReactNode } from "react"
import { NavLink } from "react-router-dom"
import {
  Flex,
  type FlexProps,
  Link as ChakraLink,
  Icon
} from "@chakra-ui/react"
import { type IconType } from "react-icons"

interface NavItemProps extends FlexProps {
  icon: IconType
  path: string
  children: ReactNode
}

const NavItem: React.FC<NavItemProps> =
  ({ icon, path, children, ...rest }) => {
    return (
      <ChakraLink
        as={NavLink}
        to={path}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
        _activeLink={{
          "> div": {
            bg: "cyan.400",
            color: "white"
          }
        }}
      >
        <Flex
          transition="all .2s"
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white"
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              as={icon}
            />
          )}
          {children}
        </Flex>
      </ChakraLink>
    )
  }

export default NavItem
