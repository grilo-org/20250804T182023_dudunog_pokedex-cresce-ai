import { type Signup } from "@/domain/usecases"
import { makeApiUrl } from "@/main/factories/http"
import { makeHttpClientDecorator } from "@/main/factories/decorators"
import { makeRemoteStoreAuthentication } from "@/main/factories/usecases"
import { RemoteSignup } from "@/data/usecases"

export const makeRemoteSignup = (): Signup =>
  new RemoteSignup(
    makeApiUrl("/signup"),
    makeHttpClientDecorator(),
    makeRemoteStoreAuthentication()
  )
