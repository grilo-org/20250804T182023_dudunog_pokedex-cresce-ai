import { type AddPoketeam } from "@/domain/usecases"
import { RemoteAddPoketeam } from "@/data/usecases"
import { makeApiUrl } from "@/main/factories/http"
import { makeHttpClientDecorator } from "@/main/factories/decorators"

export const makeRemoteAddPoketeam = (): AddPoketeam =>
  new RemoteAddPoketeam(
    makeApiUrl("/poketeam/create"),
    makeHttpClientDecorator()
  )
