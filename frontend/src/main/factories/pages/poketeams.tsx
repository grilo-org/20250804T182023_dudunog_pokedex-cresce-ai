import React, { lazy } from "react"
import { Loadable } from "@/presentation/components"
import { type PoketeamsProps } from "@/presentation/pages/poketeams/poketeams"
import { makeRemoteLoadPoketeamList } from "../usecases/poketeam/remote-load-poketeam-list-factory"

// @ts-expect-error ignore
const Poketeams: React.FC<PoketeamsProps> = Loadable(lazy(async () => import("@/presentation/pages/poketeams/poketeams")))

export const makePoketeams: React.FC = () => {
  return (
    <Poketeams
      loadPoketeamList={makeRemoteLoadPoketeamList()}
    />
  )
}
