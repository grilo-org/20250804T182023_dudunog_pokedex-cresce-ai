import {
  type CaseReducerActions,
  type Slice,
  type SliceCaseReducers
} from "@reduxjs/toolkit"

export interface ISlice<State = any, CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
    SliceName extends string = string> {
  getSlice: () => Slice
  getActions: () => CaseReducerActions<CaseReducers, SliceName>
}
