import React from "react"
import { type PoketeamModel } from "@/domain/models"
import {
  Box,
  Flex,
  Text,
  useColorModeValue
} from "@chakra-ui/react"
import { Link } from "react-router-dom"

interface PoketeamItemProps {
  poketeam: PoketeamModel
}

const PoketeamItem: React.FC<PoketeamItemProps> =
  ({ poketeam }: PoketeamItemProps) => {
    return (
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="300px"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Box p="6">
          <Flex mt="1" alignItems="center" justifyContent="space-between">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              <Link to={`/poketeam/${poketeam.id}`}>
                {poketeam.name}
              </Link>
            </Box>
            <Text>
              {poketeam.pokemons.length} pokemon(s)
            </Text>
          </Flex>
        </Box>
      </Box>
    )
  }

export default PoketeamItem
