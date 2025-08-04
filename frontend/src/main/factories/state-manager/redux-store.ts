import {
  authenticationPersistConfig,
  pokemonPersistConfig,
  poketeamPersistConfig,
  ReduxStore
} from "@/infra/state-manager"
import {
  authenticationReducer,
  pokemonReducer,
  poketeamReducer
} from "@/infra/state-manager/slices"
import {
  type PoketeamState,
  type AuthenticationState,
  type PokemonState
} from "@/data/protocols/state-manager"
import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"

export interface StateType {
  readonly pokemon: PokemonState
  readonly authentication: AuthenticationState
  readonly poketeam: PoketeamState
}

export const makeReduxStateManager = (): ReduxStore<StateType> =>
  new ReduxStore({
    rootReducer: combineReducers({
      pokemon: persistReducer(
        pokemonPersistConfig,
        pokemonReducer
      ),
      poketeam: persistReducer(
        poketeamPersistConfig,
        poketeamReducer
      ),
      authentication: persistReducer(
        authenticationPersistConfig,
        authenticationReducer
      )
    })
  })
