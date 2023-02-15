import { ActionTypes } from "../action-types";
import { Cell, CellTypes } from "../cell";

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

export interface BundleStartAction {
  type: ActionTypes.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionTypes.BUNDLE_COMPLETE;
  payload: {
    // which cell did I finish the bundling for?
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface FetchCellsAction {
  type: ActionTypes.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
  type: ActionTypes.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}

export interface FetchCellsErrorAction {
  type: ActionTypes.FETCH_CELLS_ERROR;
  payload: string;
}

export interface SaveCellsErrorAction {
  type: ActionTypes.SAVE_CELLS_ERROR;
  payload: string;
}

export type Action =
  | UpdateCellAction
  | DeleteCellAction
  | MoveCellAction
  | InsertCellBeforeAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction;
