import React from "react"
import { type PokemonDetailsModel } from "@/domain/models"
import { POKEMON_TYPES, Tags } from "@/presentation/components"
import {
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  Text
} from "@chakra-ui/react"

interface PokemonDetailsProps {
  pokemon: PokemonDetailsModel
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  pokemon
}) => {
  const pokemonMainColor = POKEMON_TYPES[pokemon.types[0].type.name]
  const pokemonImage = pokemon?.sprites.other["official-artwork"].front_default
  const pokemonWeight = pokemon.weight / 10
  const pokemonHeight = pokemon.height / 10

  return (
    <Stack>
      <Box
        p={5}
        margin="auto"
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
        backgroundColor={`${pokemonMainColor}.50`}
        borderRadius={20}
        gap={5}
      >
        <HStack
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
        >
          <Tag
            fontWeight="bold"
            colorScheme={pokemonMainColor}
          >
            {pokemon.id}
          </Tag>
          <Box
            display="flex"
            justifyContent="flex-start"
            borderRadius="lg"
            overflow="hidden"
            alignSelf="center"
          >
            <Image
              maxH={250}
              maxW={250}
              src={pokemonImage}
              alt={pokemon.name}
              objectFit="contain"
              transform="scale(1.0)"
              width="100%"
              height="100%"
              loading="lazy"
            />
          </Box>
          <Box mt={5} w="100%" display="flex" justifyContent="center">
            <Tags
              tags={pokemon.types.map(type => {
                return {
                  name: type.type.name,
                  colorScheme: POKEMON_TYPES[type.type.name]
                }
              })}
            />
          </Box>
        </HStack>
        <HStack
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          spacing={10}
        >
          <Box>
            <Heading size="xl" color={pokemonMainColor}>
              <Text casing="capitalize">
                {pokemon.name}
              </Text>
            </Heading>
          </Box>
          <Stack paddingTop={4} marginInlineStart="0 !important">
            <Box>
              <Text fontWeight="bold">
                Weight
              </Text>
              <Text>
                {pokemonWeight}kg
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold">
                Height
              </Text>
              <Text>
                {pokemonHeight}m
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold">
                Abilities
              </Text>
              <Text mt={1}>
                <Tags
                  tags={pokemon.abilities.map(ability => {
                    return {
                      name: ability.ability.name
                    }
                  })}
                />
              </Text>
            </Box>
          </Stack>
        </HStack>
      </Box>
    </Stack>
  )
}

export default PokemonDetails
