import React from "react"
import { ROUTES } from "@/presentation/components/routes/paths"
import { PokemonLogo } from "@/presentation/components"
import { Link } from "react-router-dom"
import { Box, Button, Flex, Text } from "@chakra-ui/react"

const NotFound: React.FC = () => {
  return (
    <Flex
      color="white"
      height="100vh"
      direction="column"
      align="center"
      gap="1rem"
      margin="0 auto"
    >
      <Box mt={10}>
        <PokemonLogo />
      </Box>
      <Box>
        <Text
          fontSize="3xl"
          color="black"
        >
          Desculpe, página não encontrada
        </Text>
      </Box>
      <Box flex="1" mt={4}>
        <Link to={ROUTES.root}>
          <Button
            bg="cyan.400"
            _hover={{
              bg: "cyan.500"
            }}
          >
            Ir para a Home
          </Button>
        </Link>
      </Box>
    </Flex>
  )
}

export default NotFound
