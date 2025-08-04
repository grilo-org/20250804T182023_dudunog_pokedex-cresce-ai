import { type StorePoketeam } from "@/domain/usecases"
import { poketeamSlices } from "@/infra/state-manager/slices"
import { useAppDispatch } from "@/main/providers/redux-store-provider"
import { RemoteStorePoketeam } from "@/data/usecases"

export const makeRemoteStorePoketeam = (): StorePoketeam => {
  const dispatch = useAppDispatch()
  return new RemoteStorePoketeam(
    dispatch,
    poketeamSlices
  )
}
