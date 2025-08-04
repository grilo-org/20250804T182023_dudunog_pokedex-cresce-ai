import { type UpdateSession } from "@/domain/usecases"
import { RemoteUpdateSession } from "@/data/usecases"
import { makeHttpClientDecorator } from "@/main/factories/decorators"
import { makeRemoteStoreAuthentication } from "@/main/factories/usecases"

export const makeRemoteUpdateSession = (): UpdateSession =>
  new RemoteUpdateSession(
    makeRemoteStoreAuthentication(),
    makeHttpClientDecorator()
  )
