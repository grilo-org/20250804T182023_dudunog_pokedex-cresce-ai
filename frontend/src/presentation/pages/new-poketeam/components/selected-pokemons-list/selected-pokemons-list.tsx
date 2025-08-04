import React from "react"
import { type LoadPokemonList } from "@/domain/usecases"
import { PokemonItemEmpty, PokemonSmallCard } from "@/presentation/pages/new-poketeam/components"

interface ListProps {
  pokemons: LoadPokemonList.Model[]
}

const SelectedPokemonsList: React.FC<ListProps> =
  ({ pokemons }) => {
    return (
      <>
        {pokemons?.length
          ? (
              pokemons?.map((pokemon, index) => {
                return (
                  <PokemonSmallCard
                    key={index}
                    pokemon={{
                      id: String(pokemon.id),
                      name: pokemon.name,
                      image: pokemon?.sprites?.other["official-artwork"]?.front_default
                    }}
                  />
                )
              })
            )
          : <PokemonItemEmpty />}
      </>
    )
  }

export default SelectedPokemonsList
