import { Action } from "../actions";
import { ActionTypes } from "../action-types";
import { Cell } from "../cell";

const initialState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

export interface CellsState {
  loading: boolean;
  error: null | string;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

export const cellsReducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionTypes.MOVE_CELL:
      return state;
    case ActionTypes.UPDATE_CELL:
      return state;
    case ActionTypes.DELETE_CELL:
      return state;
    case ActionTypes.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
};
