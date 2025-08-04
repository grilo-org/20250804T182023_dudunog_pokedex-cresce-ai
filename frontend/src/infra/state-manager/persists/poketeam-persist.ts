import storage from "redux-persist/lib/storage"

export const poketeamPersistConfig = {
  key: "poketeam",
  storage,
  keyPrefix: "redux-",
  whitelist: []
}
