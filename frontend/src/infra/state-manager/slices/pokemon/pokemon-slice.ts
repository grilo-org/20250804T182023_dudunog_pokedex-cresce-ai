import { type ISlice, type PokemonState } from "@/data/protocols/state-manager"
import { type CaseReducerActions, createSlice, type Slice } from "@reduxjs/toolkit"
import { pokemonReducers } from "@/infra/state-manager/reducers"

const initialState: PokemonState = {
  isLoading: false,
  pokemons: [],
  pokemon: null,
  size: 0,
  error: null,
  sortBy: null,
  filters: {
    limit: 20,
    offset: 0
  }
}

export class PokemonSlice implements ISlice<PokemonState, typeof pokemonReducers, "pokemon"> {
  private readonly pokemonSlice: Slice

  constructor () {
    const pokemonSlice = createSlice({
      name: "pokemon",
      initialState,
      reducers: pokemonReducers
    })

    this.pokemonSlice = pokemonSlice
  }

  getSlice (): Slice {
    return this.pokemonSlice
  }

  getActions (): CaseReducerActions<typeof pokemonReducers, "pokemon"> {
    return this.pokemonSlice.actions as
      CaseReducerActions<typeof pokemonReducers, "pokemon">
  }
}

const pokemonSlice = new PokemonSlice()

// Reducer
export default pokemonSlice.getSlice().reducer

// Actions
export const pokemonSlices = pokemonSlice.getActions()
export type PokemonSlicesType = typeof pokemonSlices
