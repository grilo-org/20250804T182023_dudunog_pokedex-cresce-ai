import React, { lazy } from "react"
import { Loadable } from "@/presentation/components"
import { type PokemonDetailsProps } from "@/presentation/pages/pokemon-details/pokemon-details"
import { makeRemoteLoadPokemon, makeRemoteStorePokemon } from "@/main/factories/usecases"

// @ts-expect-error ignore
const PokemonDetails: React.FC<PokemonDetailsProps> = Loadable(lazy(async () => import("@/presentation/pages/pokemon-details/pokemon-details")))

export const makePokemonDetails: React.FC = () => {
  return (
    <PokemonDetails
      loadPokemon={makeRemoteLoadPokemon()}
      storePokemon={makeRemoteStorePokemon()}
    />
  )
}
