import axios from "axios";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "redux";
import {
  MoveCellAction,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellBeforeAction,
} from "../actions";

export const updateCell = (): UpdateCellAction => {};
export const deleteCell = (): DeleteCellAction => {};
export const moveCell = (): MoveCellAction => {};
export const insertCellBefore = (): InsertCellBeforeAction => {};

// return async (dispatch: Dispatch<Action>) => {
//     dispatch({ type: ActionType.SEARCH_REPOSITORIES });

//     try {
//       // it's as if I say https://registry.npmjs.org/-/v1/search?text=term
//       const { data } = await axios.get(
//         `https://registry.npmjs.org/-/v1/search`,
//         {
//           params: {
//             text: term,
//           },
//         }
//       );

//       const names = data.objects.map((result: any) => result.package.name);

//       dispatch({
//         type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
//         payload: names,
//       });
//     } catch (error) {
//       if (error instanceof Error) {
//         dispatch({
//           type: ActionType.SEARCH_REPOSITORIES_ERROR,
//           payload: error.message,
//         });
//       }
//     }
//   };
// };
