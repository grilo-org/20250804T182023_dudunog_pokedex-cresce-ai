import React from "react"
import { type PokemonDetailsModel } from "@/domain/models"
import { type StorePoketeamList, type LoadPokemonList } from "@/domain/usecases"
import { type PoketeamState } from "@/data/protocols/state-manager"
import { useAppSelector } from "@/main/providers"
import { Pagination, PokemonItemEmpty } from "@/presentation/components"
import { PokemonItem } from "@/presentation/pages/new-poketeam/components"
import { Heading, Stack, useToast, Wrap } from "@chakra-ui/react"

interface ListProps {
  pokemons: LoadPokemonList.Model[]
  page: number
  size: number
  registersPerPage: number
  setPage: React.Dispatch<React.SetStateAction<any>>
  storePoketeamList: StorePoketeamList
  verifyPokemonsLength: (pokemons: PokemonDetailsModel[]) => boolean
}

const List: React.FC<ListProps> =
  ({
    pokemons,
    page,
    size,
    registersPerPage,
    setPage,
    storePoketeamList,
    verifyPokemonsLength
  }) => {
    const toast = useToast()

    const {
      newPoketeam
    }: PoketeamState = useAppSelector((state) => state.poketeam)

    const handleAddPokemonToTeam = (pokemon: PokemonDetailsModel): void => {
      let pokemons = newPoketeam?.pokemons || []
      const existsPokemon = pokemons.find(p => p.id === pokemon.id)

      if (existsPokemon) {
        pokemons = [...pokemons.filter(p => p.id !== pokemon.id)]

        storePoketeamList.storeNewPoketeam({
          name: "name",
          pokemons
        })
      } else {
        if (!verifyPokemonsLength(pokemons)) {
          pokemons = [...pokemons, pokemon]

          storePoketeamList.storeNewPoketeam({
            name: "name",
            pokemons
          })
        } else {
          toast({
            title: "Um time só pode conter até 6 pokemons.",
            status: "error",
            isClosable: true
          })
        }
      }
    }

    return (
      <Stack>
        <Heading marginTop={10} marginBottom={5} size="xl" color="blackAlpha.800">
          Pokemons
        </Heading>

        {pokemons?.length
          ? (
            <>
              <Pagination
                onPageChange={setPage}
                totalCountOfRegisters={size}
                currentPage={page}
                registersPerPage={registersPerPage}
              />

              <Wrap
                spacing="30px"
                css={{
                  ul: {
                    justifyContent: "center"
                  }
                }}
              >
                {pokemons.map((pokemon: LoadPokemonList.Model) =>
                  <PokemonItem
                    key={pokemon.id}
                    pokemon={pokemon}
                    handleAddPokemonToTeam={handleAddPokemonToTeam}
                  />)
                }
              </Wrap>
            </>
            )
          : <PokemonItemEmpty />}
      </Stack>
    )
  }

export default List
