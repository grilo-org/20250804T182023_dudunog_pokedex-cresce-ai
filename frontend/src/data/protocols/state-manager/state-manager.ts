export type Unsubscribe = () => void

export interface IStateManager<State, Store> {
  getStore: () => Store
  getState: () => State
  dispatch: (action: object) => void
  subscribe: (listener: () => void) => Unsubscribe
}
