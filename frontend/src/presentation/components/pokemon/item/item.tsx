import React from "react"
import { type PokemonDetailsModel } from "@/domain/models"
import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Tag,
  Text
} from "@chakra-ui/react"
import { POKEMON_TYPES } from "./types/pokemon-types-colors"
import { Tags } from "@/presentation/components"
import { Link } from "react-router-dom"

interface PokemonItemProps {
  pokemon: PokemonDetailsModel
}

const PokemonItem: React.FC<PokemonItemProps> =
  ({ pokemon }: PokemonItemProps) => {
    const pokemonMainColor = POKEMON_TYPES[pokemon.types[0].type.name]

    return (
      <SimpleGrid>
        <Box
          w="100%"
          padding={5}
          backgroundColor={`${pokemonMainColor}.50`}
          borderRadius={20}
        >
          <Tag
            fontWeight="bold"
            colorScheme={pokemonMainColor}
          >
            {pokemon.id}
          </Tag>
          <Box borderRadius="lg" overflow="hidden">
            <Link to={`/pokemon/${pokemon.name}`}>
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
            </Link>
          </Box>
          <Box
            py={1}
            pb={3}
            maxW={210}
            display="flex"
            justifyContent="center"
          >
            <Link to={`/pokemon/${pokemon.name}`}>
              <Heading size="md" color="blackAlpha.700">
                <Text casing="capitalize" textAlign="center">
                  {pokemon.name}
                </Text>
              </Heading>
            </Link>
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
