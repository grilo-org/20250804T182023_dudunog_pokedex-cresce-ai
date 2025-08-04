import { type LoadPoketeam } from "@/domain/usecases"
import { RemoteLoadPoketeam } from "@/data/usecases"
import {
  makeRemoteFetchPokemon,
  makeRemoteFetchPoketeam,
  makeRemoteStorePoketeam
} from "@/main/factories/usecases"

export const makeRemoteLoadPoketeam = (): LoadPoketeam =>
  new RemoteLoadPoketeam(
    makeRemoteFetchPoketeam(),
    makeRemoteFetchPokemon(),
    makeRemoteStorePoketeam()
  )
