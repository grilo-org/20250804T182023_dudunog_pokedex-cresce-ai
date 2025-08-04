import React, { useEffect } from "react"
import { type PoketeamState } from "@/data/protocols/state-manager"
import { useAppSelector } from "@/main/providers/redux-store-provider"
import { Loading } from "@/presentation/components"
import PoketeamDetails from "./components/pokemon-details/poketeam-details"
import { type LoadPoketeam } from "@/domain/usecases"
import { Container } from "@chakra-ui/react"
import { useParams } from "react-router-dom"

export interface PoketeamDetailsProps {
  loadPoketeam: LoadPoketeam
}

const PoketeamDetailsPage: React.FC<PoketeamDetailsProps> = ({
  loadPoketeam
}) => {
  type ParamProps = {
    id: string
  }

  const { id = "" } = useParams<ParamProps>()
  const {
    isLoading,
    poketeam,
    error
  }: PoketeamState = useAppSelector((state) => state.poketeam)

  const load = async (poketeamId: string): Promise<void> => {
    await loadPoketeam.load(poketeamId)
  }

  useEffect(() => {
    load(id)
  }, [])

  return (
    <Container maxW="7xl" p="12">
      {isLoading && <Loading />}
      {error && "Aconteceu um erro inesperado"}
      {poketeam
        ? (
            <PoketeamDetails
              poketeam={poketeam}
            />
          )
        : ""}
    </Container>
  )
}

export default PoketeamDetailsPage
