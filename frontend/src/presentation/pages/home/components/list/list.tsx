import React from "react"
import { type LoadPokemonList } from "@/domain/usecases"
import { Pagination, PokemonItem, PokemonItemEmpty } from "@/presentation/components"
import { Heading, Stack, Wrap } from "@chakra-ui/react"

interface ListProps {
  pokemons: LoadPokemonList.Model[]
  page: number
  size: number
  registersPerPage: number
  setPage: React.Dispatch<React.SetStateAction<any>>
}

const List: React.FC<ListProps> =
  ({ pokemons, page, size, registersPerPage, setPage }) => {
    return (
      <Stack>
        <Heading size="xl" marginBottom={5} color="blackAlpha.800">
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
                    <PokemonItem key={pokemon.id} pokemon={pokemon} />)
                  }
                </Wrap>
              </>
            )
          : <PokemonItemEmpty />}
      </Stack>
    )
  }

export default List
