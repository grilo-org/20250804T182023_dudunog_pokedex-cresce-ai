import { type LoadUser } from "@/domain/usecases"
import {
  makeRemoteFetchUser,
  makeRemoteStoreAuthentication
} from "@/main/factories/usecases"
import { RemoteLoadUser } from "@/data/usecases/authentication/remote-load-user"

export const makeRemoteLoadUser = (): LoadUser =>
  new RemoteLoadUser(
    makeRemoteFetchUser(),
    makeRemoteStoreAuthentication()
  )
