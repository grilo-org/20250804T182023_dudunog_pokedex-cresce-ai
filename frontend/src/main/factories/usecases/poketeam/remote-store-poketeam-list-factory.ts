import { type StorePoketeamList } from "@/domain/usecases"
import { RemoteStorePoketeamList } from "@/data/usecases"
import { poketeamSlices } from "@/infra/state-manager/slices"
import { useAppDispatch } from "@/main/providers/redux-store-provider"

export const makeRemoteStorePoketeamList = (): StorePoketeamList => {
  const dispatch = useAppDispatch()
  return new RemoteStorePoketeamList(
    dispatch,
    poketeamSlices
  )
}
