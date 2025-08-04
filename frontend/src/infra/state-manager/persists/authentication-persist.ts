import storage from "redux-persist/lib/storage"

export const authenticationPersistConfig = {
  key: "authentication",
  storage,
  keyPrefix: "redux-",
  whitelist: []
}
