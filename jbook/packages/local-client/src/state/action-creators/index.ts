import { ActionTypes } from "../action-types";
import { Dispatch } from "redux";
import {
  MoveCellAction,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellBeforeAction,
  Action,
  Direction,
} from "../actions";
import { CellTypes, Cell } from "../cell";
import bundle from "../../bundler";
import axios from "axios";
import { RootState } from "../reducers";

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

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({ type: ActionTypes.FETCH_CELLS_COMPLETE, payload: data });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ActionTypes.FETCH_CELLS_ERROR,
          payload: error.message,
        });
      }
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    // from the state now getting props
    const {
      cellsReducer: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);
    try {
      await axios.post("/cells", { cells });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ActionTypes.SAVE_CELLS_ERROR,
          payload: error.message,
        });
      }
    }
  };
};
