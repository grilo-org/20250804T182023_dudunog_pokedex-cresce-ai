import React, { lazy } from "react"
import { Loadable } from "@/presentation/components"
import { type NewPoketeamProps } from "@/presentation/pages/new-poketeam/new-poketeam"
import {
  makeRemoteAddPoketeam,
  makeRemoteLoadPokemonList,
  makeRemoteStorePokemonList,
  makeRemoteStorePoketeamList
} from "@/main/factories/usecases"

// @ts-expect-error ignore
const NewPoketeam: React.FC<NewPoketeamProps> = Loadable(lazy(async () => import("@/presentation/pages/new-poketeam/new-poketeam")))

export const makeNewPoketeam: React.FC = () => {
  return (
    <NewPoketeam
      addPoketeam={makeRemoteAddPoketeam()}
      loadPokemonList={makeRemoteLoadPokemonList()}
      storePokemonList={makeRemoteStorePokemonList()}
      storePoketeamList={makeRemoteStorePoketeamList()}
    />
  )
}
