import { type Logout } from "@/domain/usecases"
import { RemoteLogout } from "@/data/usecases"
import { makeRemoteStoreAuthentication } from "./remote-store-authentication-factory"
import { makeRemoteUpdateSession } from "./remote-update-session-factory"

export const makeRemoteLogout = (): Logout =>
  new RemoteLogout(
    makeRemoteStoreAuthentication(),
    makeRemoteUpdateSession()
  )
