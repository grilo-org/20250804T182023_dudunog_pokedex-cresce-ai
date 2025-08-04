import { type StoreAuthentication } from "@/domain/usecases"
import { RemoteStoreAuthentication } from "@/data/usecases"
import { authenticationSlices } from "@/infra/state-manager/slices"
import { useAppDispatch } from "@/main/providers/redux-store-provider"

export const makeRemoteStoreAuthentication = (): StoreAuthentication => {
  const dispatch = useAppDispatch()
  return new RemoteStoreAuthentication(
    dispatch,
    authenticationSlices
  )
}
