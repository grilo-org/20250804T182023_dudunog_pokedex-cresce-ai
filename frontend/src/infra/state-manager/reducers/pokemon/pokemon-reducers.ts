import { type PokemonState } from "@/data/protocols/state-manager"
import {
  type PokemonDetailsModel,
  type PokemonListHttpResponse
} from "@/domain/models"
import { type PayloadAction } from "@reduxjs/toolkit"

export const pokemonReducers = {
  startLoading (state: PokemonState) {
    state.isLoading = true
  },

  hasError (state: PokemonState, action: PayloadAction<object>) {
    state.isLoading = false
    state.error = action.payload
  },

  getPokemonsSuccess (
    state: PokemonState,
    action: PayloadAction<PokemonListHttpResponse<PokemonDetailsModel[]>>
  ) {
    state.isLoading = false
    state.pokemons = action.payload.results
    state.size = action.payload.count
  },

  getPokemonSuccess (state: PokemonState, action: PayloadAction<PokemonDetailsModel>) {
    state.isLoading = false
    state.pokemon = action.payload
  },

  cleanPokemon (state: PokemonState) {
    state.pokemon = null
  },

  sortByPokemons (state: PokemonState, action: PayloadAction<any>) {
    state.sortBy = action.payload
  },

  filterPokemons (state: PokemonState, action: PayloadAction<any>) {
    state.filters.limit = action.payload.limit
    state.filters.offset = action.payload.offset
  }
}
