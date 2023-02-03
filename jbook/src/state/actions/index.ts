import { ActionTypes } from "../action-types";

type UpdateCell = {
  type: ActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    // the new code
    content: string;
  };
};

type DeleteCell = {
  type: ActionTypes.DELETE_CELL;
  payload: string;
};

type MoveCell = {
  type: ActionTypes.MOVE_CELL;
  payload: {
    // id of the cell I want to move
    id: string;
    direction: "up" | "down";
  };
};

type InsertCellBefore = {
  type: ActionTypes.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: "text" | "code";
  };
};

// 2 Types of Cells :)
