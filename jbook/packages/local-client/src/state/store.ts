import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ActionTypes } from "./action-types";
import { rootReducer } from "./reducers";

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));

store.dispatch({
  type: ActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});

// manual testing

store.dispatch({
  type: ActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
  },
});

store.dispatch({
  type: ActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
  },
});

store.dispatch({
  type: ActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});
