import { type LoadSession } from "@/domain/usecases"
import { RemoteLoadSession } from "@/data/usecases"
import {
  makeRemoteLoadUser,
  makeRemoteStoreAuthentication,
  makeRemoteUpdateSession
} from "@/main/factories/usecases"

export const makeRemoteLoadSession = (): LoadSession =>
  new RemoteLoadSession(
    makeRemoteUpdateSession(),
    makeRemoteLoadUser(),
    makeRemoteStoreAuthentication()
  )
