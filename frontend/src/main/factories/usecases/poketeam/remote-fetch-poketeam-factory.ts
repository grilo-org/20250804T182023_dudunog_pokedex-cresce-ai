import { type FetchPoketeam } from "@/domain/usecases"
import { RemoteFetchPoketeam } from "@/data/usecases"
import { makeApiUrl } from "@/main/factories/http"
import { makeHttpClientDecorator } from "@/main/factories/decorators"

export const makeRemoteFetchPoketeam = (): FetchPoketeam =>
  new RemoteFetchPoketeam(makeApiUrl("/poketeam"), makeHttpClientDecorator())
