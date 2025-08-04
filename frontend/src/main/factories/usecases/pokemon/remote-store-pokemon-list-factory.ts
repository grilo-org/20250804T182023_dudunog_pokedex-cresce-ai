import { type StorePokemonList } from "@/domain/usecases"
import { RemoteStorePokemonList } from "@/data/usecases"
import { pokemonSlices } from "@/infra/state-manager/slices"
import { useAppDispatch, useAppSelector } from "@/main/providers/redux-store-provider"

export const makeRemoteStorePokemonList = (): StorePokemonList => {
  const dispatch = useAppDispatch()
  return new RemoteStorePokemonList(
    dispatch,
    pokemonSlices,
    useAppSelector((state) => state.pokemon)
  )
}
