import React from "react"
import { Text } from "@chakra-ui/react"

const PokemonItemEmpty: React.FC = () => {
  return (
    <Text alignSelf="center">
      Não há pokemon(s) a serem exibidos.
    </Text>
  )
}

export default PokemonItemEmpty
