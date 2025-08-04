import React from "react"
import { type PokemonDetailsModel, type PoketeamDetailsModel } from "@/domain/models"
import {
  Heading,
  Stack,
  Wrap
} from "@chakra-ui/react"
import { PokemonItem, PokemonItemEmpty } from "@/presentation/components"

interface PoketeamDetailsProps {
  poketeam: PoketeamDetailsModel
}

const PoketeamDetails: React.FC<PoketeamDetailsProps> = ({
  poketeam
}) => {
  // const pokemonMainColor = POKEMON_TYPES[poketeam.types[0].type.name]
  // const pokemonImage = poketeam?.sprites.other["official-artwork"].front_default
  // const pokemonWeight = poketeam.weight / 10
  // const pokemonHeight = poketeam.height / 10

  return (
    <Stack>
      <Heading size="xl" marginBottom={5} color="blackAlpha.800">
        {poketeam.name}
      </Heading>

      {poketeam.pokemons?.length
        ? (
            <Wrap
              spacing="30px"
              css={{
                ul: {
                  justifyContent: "center"
                }
              }}
            >
              {poketeam.pokemons.map((pokemon: PokemonDetailsModel) =>
                <PokemonItem key={pokemon.id} pokemon={pokemon} />)
              }
            </Wrap>
          )
        : <PokemonItemEmpty />}
    </Stack>
  )
}

export default PoketeamDetails
