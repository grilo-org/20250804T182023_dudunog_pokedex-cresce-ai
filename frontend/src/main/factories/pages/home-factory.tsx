import React, { lazy } from "react"
import { Loadable } from "@/presentation/components"
import { type HomeProps } from "@/presentation/pages/home/home"
import { makeRemoteLoadPokemonList, makeRemoteStorePokemonList } from "../usecases"

// @ts-expect-error ignore
const Home: React.FC<HomeProps> = Loadable(lazy(async () => import("@/presentation/pages/home/home")))

export const makeHome: React.FC = () => {
  return (
    <Home
      loadPokemonList={makeRemoteLoadPokemonList()}
      storePokemonList={makeRemoteStorePokemonList()}
    />
  )
}
