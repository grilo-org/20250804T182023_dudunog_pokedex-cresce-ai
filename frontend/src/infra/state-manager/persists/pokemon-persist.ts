import storage from "redux-persist/lib/storage"

export const pokemonPersistConfig = {
  key: "pokemon",
  storage,
  keyPrefix: "redux-",
  whitelist: []
}
