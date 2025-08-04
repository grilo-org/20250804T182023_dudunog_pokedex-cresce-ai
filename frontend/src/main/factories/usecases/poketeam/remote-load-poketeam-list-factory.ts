import { type LoadPoketeamList } from "@/domain/usecases"
import { RemoteLoadPoketeamList } from "@/data/usecases"
import {
  makeRemoteFetchPoketeamList,
  makeRemoteStorePoketeamList
} from "@/main/factories/usecases"

export const makeRemoteLoadPoketeamList = (): LoadPoketeamList =>
  new RemoteLoadPoketeamList(
    makeRemoteFetchPoketeamList(),
    makeRemoteStorePoketeamList()
  )
