import axios from "axios";
import { ActionTypes } from "../action-types";
import { Dispatch } from "redux";
import {
  MoveCellAction,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellBeforeAction,
  BundleStartAction,
  BundleCompleteAction,
  Action,
  Direction,
} from "../actions";
import { CellTypes } from "../cell";
import bundle from "../../bundler";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: id,
  };
};
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertCellBefore = (
  id: string | null,
  cellType: CellTypes
): InsertCellBeforeAction => {
  return {
    type: ActionTypes.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const bundleActionCreator = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.BUNDLE_START, payload: { cellId } });

    const result = await bundle(input);

    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: { code: result.code, err: result.error },
      },
    });
  };
};
