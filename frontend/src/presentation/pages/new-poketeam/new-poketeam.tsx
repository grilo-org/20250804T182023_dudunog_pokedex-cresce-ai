import React, { useEffect, useState } from "react"
import { type PokemonDetailsModel } from "@/domain/models"
import { type PokemonState, type PoketeamState } from "@/data/protocols/state-manager"
import { useAppSelector } from "@/main/providers"
import { Loading } from "@/presentation/components"
import {
  PokemonListItem,
  SelectedPokemonsList
} from "@/presentation/pages/new-poketeam/components"
import { useNavigate } from "react-router-dom"
import {
  type StorePoketeamList,
  type AddPoketeam,
  type LoadPokemonList,
  type StorePokemonList
} from "@/domain/usecases"
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast
} from "@chakra-ui/react"
import { ROUTES } from "@/presentation/components/routes/paths"

export interface NewPoketeamProps {
  addPoketeam: AddPoketeam
  loadPokemonList: LoadPokemonList
  storePokemonList: StorePokemonList
  storePoketeamList: StorePoketeamList
}

const NewPoketeam: React.FC<NewPoketeamProps> = ({
  addPoketeam,
  loadPokemonList,
  storePokemonList,
  storePoketeamList
}) => {
  const navigate = useNavigate()

  const toast = useToast()
  const [page, setPage] = useState(1)
  const [name, setName] = useState("")

  const {
    newPoketeam
  }: PoketeamState = useAppSelector((state) => state.poketeam)

  const {
    isLoading,
    pokemons,
    size,
    filters: {
      limit
    },
    error
  }: PokemonState = useAppSelector((state) => state.pokemon)

  const load = (page: number): void => {
    const offset = (limit * ((page ?? 1) - 1))

    storePokemonList.filterPokemons({ page, limit, offset })
    loadPokemonList.loadAll({
      limit,
      offset
    })
  }

  const verifyPokemonsLength = (pokemons: PokemonDetailsModel[]): boolean => {
    return pokemons.length >= 6
  }

  const verifyPoketeamName = (name: string): boolean => {
    return name.length > 0
  }

  const reset = (): void => {
    setName("")
    storePoketeamList.storeNewPoketeam(null)
  }

  const handleAddPoketeam = async (): Promise<void> => {
    const pokemonsLength = !verifyPokemonsLength(pokemons)
    const poketeamName = verifyPoketeamName(name)
    let toastTitle = ""

    if (pokemonsLength || poketeamName) {
      const response = await addPoketeam.add({
        name,
        pokemons: newPoketeam?.pokemons.map(pokemon => String(pokemon.id)) as string[]
      })

      if (response) {
        toastTitle = "Time criado!"

        reset()
        load(page)
        toast({
          title: toastTitle,
          status: "success",
          isClosable: true
        })

        navigate(ROUTES.poketeams)
      }
    } else {
      toastTitle = "Um time precisa conter 6 pokemons!"
      if (!poketeamName) {
        toastTitle = "Insira um nome para o seu time!"
      }

      toast({
        title: toastTitle,
        status: "error",
        isClosable: true
      })
    }
  }

  useEffect(() => {
    load(page)
  }, [page])

  return (
    <>
      <Container maxW="7xl" p="12">
        <Stack>
          <Heading marginBottom={5} size="xl" color="blackAlpha.800">
            Criar time
          </Heading>

          <Stack spacing={3}>
            <Input
              mb={4}
              bg="white"
              value={name}
              placeholder="Nome do time"
              onChange={(e) => setName(e.target.value)}
            />
          </Stack>

          <Box
            py={6}
            px={6}
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderRadius={20}
            display="flex"
            alignItems="center"
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent="space-around"
            overflowX="auto"
            transition="all 0.1s"
            gap={{ base: 10 }}
          >
            <SelectedPokemonsList pokemons={newPoketeam?.pokemons as PokemonDetailsModel[]} />
          </Box>

          <Button
            color="white"
            backgroundColor="cyan.400"
            onClick={handleAddPoketeam}
            _hover={{
              backgroundColor: "cyan.500"
            }}
          >
            Criar time
          </Button>

          {isLoading
            ? <Loading />
            : (error
                ? "Error"
                : <PokemonListItem
                    pokemons={pokemons}
                    page={page}
                    size={size}
                    registersPerPage={limit}
                    setPage={setPage}
                    storePoketeamList={storePoketeamList}
                    verifyPokemonsLength={verifyPokemonsLength}
                  />
              )}
        </Stack>
      </Container>
    </>
  )
}

export default NewPoketeam
