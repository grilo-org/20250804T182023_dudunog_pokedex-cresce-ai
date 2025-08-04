import React from "react"
import { Text } from "@chakra-ui/react"

const PokemonItemEmpty: React.FC = () => {
  return (
    <Text alignSelf="center">
      Não há pokemon(s) selecionados. Selecione algum na lista abaixo para incluir no time.
    </Text>
  )
}

export default PokemonItemEmpty
