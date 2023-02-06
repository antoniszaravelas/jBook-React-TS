import { Action } from "../actions";
import { ActionTypes } from "../action-types";
import produce from "immer";

interface BundlesState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}

const initialState: BundlesState = {};

export const bundlesReducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionTypes.BUNDLE_START:
        state[action.payload.cellId] = { loading: true, code: "", err: "" };
        return state;
      case ActionTypes.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default bundlesReducer;
