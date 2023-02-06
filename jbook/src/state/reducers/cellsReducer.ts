import produce from "immer";
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

export const cellsReducer = produce(
  (state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
      case ActionTypes.MOVE_CELL:
        let { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1)
          return state;

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;

      case ActionTypes.UPDATE_CELL:
        // we dont have to return a value because immer will return a state by using produce
        state.data[action.payload.id].content = action.payload.content;
        return state;

      case ActionTypes.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;

      case ActionTypes.INSERT_CELL_BEFORE:
        const cell: Cell = {
          content: "",
          type: action.payload.type,
          id: randomId(),
        };

        state.data[cell.id] = cell;
        const foundIndex = state.order.findIndex(
          (elements) => elements === action.payload.id
        );

        if (foundIndex < 0) state.order.push(cell.id);
        else state.order.splice(foundIndex, 0, cell.id);
        return state;

      default:
        return state;
    }
  }
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};
