import { type LoadPokemon } from "@/domain/usecases"
import { RemoteLoadPokemon } from "@/data/usecases"
import {
  makeRemoteFetchPokemon,
  makeRemoteStorePokemon
} from "@/main/factories/usecases"

export const makeRemoteLoadPokemon = (): LoadPokemon =>
  new RemoteLoadPokemon(
    makeRemoteFetchPokemon(),
    makeRemoteStorePokemon()
  )
