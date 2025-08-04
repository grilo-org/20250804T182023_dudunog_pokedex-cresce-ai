import { type FetchPoketeamList } from "@/domain/usecases"
import { RemoteFetchPoketeamList } from "@/data/usecases"
import { makeApiUrl } from "@/main/factories/http"
import { makeHttpClientDecorator } from "@/main/factories/decorators"

export const makeRemoteFetchPoketeamList = (): FetchPoketeamList =>
  new RemoteFetchPoketeamList(makeApiUrl("/poketeams"), makeHttpClientDecorator())
