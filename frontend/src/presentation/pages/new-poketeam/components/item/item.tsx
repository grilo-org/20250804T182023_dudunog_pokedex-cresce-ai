import React from "react"
import { type PokemonDetailsModel } from "@/domain/models"
import { Tags } from "@/presentation/components"
import { POKEMON_TYPES } from "./types/pokemon-types-colors"
import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Tag,
  Text
} from "@chakra-ui/react"
import { type PoketeamState } from "@/data/protocols/state-manager"
import { useAppSelector } from "@/main/providers"

interface PokemonItemProps {
  pokemon: PokemonDetailsModel
  handleAddPokemonToTeam: (pokemon: PokemonDetailsModel) => void
}

const PokemonItem: React.FC<PokemonItemProps> =
  ({ pokemon, handleAddPokemonToTeam }: PokemonItemProps) => {
    const {
      newPoketeam
    }: PoketeamState = useAppSelector((state) => state.poketeam)

    const pokemonMainColor = POKEMON_TYPES[pokemon.types[0].type.name]

    const handleAddPoketeam = (pokemon: PokemonDetailsModel): void => {
      handleAddPokemonToTeam(pokemon)
    }

    return (
      <SimpleGrid>
        <Box
          w="100%"
          padding={5}
          backgroundColor={`${pokemonMainColor}.50`}
          border={newPoketeam?.pokemons?.find(p => p.id === pokemon.id) ? "2px" : ""}
          borderColor="blue.800"
          borderRadius={20}
          _hover={{ cursor: "pointer" }}
          onClick={() => handleAddPoketeam(pokemon)}
        >
          <Tag
            fontWeight="bold"
            colorScheme={pokemonMainColor}
          >
            {pokemon.id}
          </Tag>
          <Box borderRadius="lg" overflow="hidden">
            <Image
              maxH={160}
              transform="scale(1.0)"
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              objectFit="contain"
              width="100%"
              height="100%"
              transition="0.3s ease-in-out"
              loading="lazy"
              _hover={{
                transform: "scale(1.05)"
              }}
            />
          </Box>
          <Box
            py={1}
            pb={3}
            maxW={210}
            display="flex"
            justifyContent="center"
          >
            <Heading size="md" color="blackAlpha.700">
              <Text casing="capitalize" textAlign="center">
                {pokemon.name}
              </Text>
            </Heading>
          </Box>
          <Box display="flex" justifyContent="center">
            <Tags
              tags={pokemon.types.map(type => {
                return {
                  name: type.type.name,
                  colorScheme: POKEMON_TYPES[type.type.name]
                }
              })}
            />
          </Box>
        </Box>
      </SimpleGrid>
    )
  }

export default PokemonItem
