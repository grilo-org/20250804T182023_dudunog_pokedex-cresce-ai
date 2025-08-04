import { type Signin } from "@/domain/usecases"
import { RemoteSignin } from "@/data/usecases/authentication/remote-signin"
import { makeApiUrl } from "@/main/factories/http"
import { makeHttpClientDecorator } from "@/main/factories/decorators"
import {
  makeRemoteStoreAuthentication,
  makeRemoteLoadUser,
  makeRemoteUpdateSession
} from "@/main/factories/usecases"

export const makeRemoteSignin = (): Signin =>
  new RemoteSignin(
    makeApiUrl("/signin"),
    makeHttpClientDecorator(),
    makeRemoteStoreAuthentication(),
    makeRemoteLoadUser(),
    makeRemoteUpdateSession()
  )
