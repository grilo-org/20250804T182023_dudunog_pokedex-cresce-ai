import React, { useEffect } from "react"
import { type PokemonState } from "@/data/protocols/state-manager"
import { useAppSelector } from "@/main/providers/redux-store-provider"
import { Loading } from "@/presentation/components"
import PokemonDetails from "./components/pokemon-details/pokemon-details"
import {
  type LoadPokemon,
  type StorePokemon
} from "@/domain/usecases"
import { Container } from "@chakra-ui/react"
import { useParams } from "react-router-dom"

export interface PokemonDetailsProps {
  loadPokemon: LoadPokemon
  storePokemon: StorePokemon
}

const PokemonDetailsPage: React.FC<PokemonDetailsProps> = ({
  loadPokemon
}) => {
  type ParamProps = {
    id: string
  }

  const { id = "" } = useParams<ParamProps>()
  const {
    isLoading,
    pokemon,
    error
  }: PokemonState = useAppSelector((state) => state.pokemon)

  const load = async (name: string): Promise<void> => {
    await loadPokemon.load(name)
  }

  useEffect(() => {
    load(id)
  }, [])

  return (
    <Container maxW="7xl" p={{ base: 0 }}>
      {isLoading && <Loading />}
      {error && "Aconteceu um erro inesperado"}
      {pokemon
        ? (
            <PokemonDetails
              pokemon={pokemon}
            />
          )
        : ""}
    </Container>
  )
}

export default PokemonDetailsPage
