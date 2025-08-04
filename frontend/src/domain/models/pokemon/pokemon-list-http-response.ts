export interface PokemonListHttpResponse<T> {
  count: number
  next: any
  previous: string
  results: T
}
