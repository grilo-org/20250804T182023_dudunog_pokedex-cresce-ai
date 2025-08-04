import { type LoadPokemonList } from "@/domain/usecases"
import { RemoteLoadPokemonList } from "@/data/usecases"
import {
  makeRemoteFetchPokemonList,
  makeRemoteStorePokemonList
} from "@/main/factories/usecases"
import { makeRemoteFetchPokemon } from "./remote-fetch-pokemon-factory"

export const makeRemoteLoadPokemonList = (): LoadPokemonList =>
  new RemoteLoadPokemonList(
    makeRemoteFetchPokemonList(),
    makeRemoteFetchPokemon(),
    makeRemoteStorePokemonList()
  )
