import React from "react"
import { Box, Image, Text } from "@chakra-ui/react"

export interface NewPoketeamProps {
  pokemon: {
    id: string
    name: string
    image: string
  }
}

const PokemonSmallCard: React.FC<NewPoketeamProps> = ({ pokemon }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Image
        maxH={50}
        transform="scale(1.0)"
        src={pokemon?.image}
        alt={pokemon.name}
        objectFit="contain"
        width="100%"
        height="100%"
        loading="lazy"
      />
      <Text>
        {pokemon.name}
      </Text>
    </Box>
  )
}

export default PokemonSmallCard
