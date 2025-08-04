import { type FetchUser } from "@/domain/usecases"
import { makeApiUrl } from "@/main/factories/http"
import { makeHttpClientDecorator } from "@/main/factories/decorators"
import { RemoteFetchUser } from "@/data/usecases/authentication/remote-fetch-user"
import { makeRemoteStoreAuthentication } from "@/main/factories/usecases"

export const makeRemoteFetchUser = (): FetchUser =>
  new RemoteFetchUser(
    makeApiUrl("/user"),
    makeHttpClientDecorator(),
    makeRemoteStoreAuthentication()
  )
