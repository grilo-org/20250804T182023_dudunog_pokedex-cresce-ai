import React, { lazy } from "react"
import { Loadable } from "@/presentation/components"
import { type PoketeamDetailsProps } from "@/presentation/pages/poketeam-details/poketeam-details"
import { makeRemoteLoadPoketeam } from "@/main/factories/usecases"

// @ts-expect-error ignore
const PoketeamDetails: React.FC<PoketeamDetailsProps> = Loadable(lazy(async () => import("@/presentation/pages/poketeam-details/poketeam-details")))

export const makePoketeamDetails: React.FC = () => {
  return (
    <PoketeamDetails
      loadPoketeam={makeRemoteLoadPoketeam()}
    />
  )
}
