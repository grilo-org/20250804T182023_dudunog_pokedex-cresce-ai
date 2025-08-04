import React, { useEffect } from "react"
import { type PoketeamState } from "@/data/protocols/state-manager"
import { useAppSelector } from "@/main/providers"
import { PoketeamListItem } from "./components"
import { Loading } from "@/presentation/components"
import { type LoadPoketeamList } from "@/domain/usecases"
import { Container } from "@chakra-ui/react"

export interface PoketeamsProps {
  loadPoketeamList: LoadPoketeamList
}

const Poketeams: React.FC<PoketeamsProps> = ({ loadPoketeamList }) => {
  const {
    isLoading,
    poketeams,
    error
  }: PoketeamState = useAppSelector((state) => state.poketeam)

  const load = (): void => {
    loadPoketeamList.loadAll()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Container maxW="7xl" p="12">
      {isLoading
        ? <Loading />
        : (
            error
              ? "Error"
              : <PoketeamListItem
                  poketeams={poketeams}
                />
          )}
    </Container>
  )
}

export default Poketeams
