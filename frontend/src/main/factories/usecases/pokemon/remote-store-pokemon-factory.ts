import { type StorePokemon } from "@/domain/usecases"
import { RemoteStorePokemon } from "@/data/usecases"
import { pokemonSlices } from "@/infra/state-manager/slices"
import { useAppDispatch } from "@/main/providers/redux-store-provider"

export const makeRemoteStorePokemon = (): StorePokemon => {
  const dispatch = useAppDispatch()
  return new RemoteStorePokemon(
    dispatch,
    pokemonSlices
  )
}
