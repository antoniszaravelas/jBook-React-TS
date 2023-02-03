import { ActionTypes } from "../action-types";
import { CellTypes } from "../cell";

export type Direction = "up" | "down";

export type UpdateCellAction = {
  type: ActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    // the new code
    content: string;
  };
};

export type DeleteCellAction = {
  type: ActionTypes.DELETE_CELL;
  payload: string;
};

export type MoveCellAction = {
  type: ActionTypes.MOVE_CELL;
  payload: {
    // id of the cell I want to move
    id: string;
    direction: Direction;
  };
};

export type InsertCellBeforeAction = {
  type: ActionTypes.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: CellTypes;
  };
};

// 2 Types of Cells :)

export type Action =
  | UpdateCellAction
  | DeleteCellAction
  | MoveCellAction
  | InsertCellBeforeAction;
