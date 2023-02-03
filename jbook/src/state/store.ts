import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));

// manual testing

// store.dispatch({
//   type: ActionTypes.INSERT_CELL_BEFORE,
//   payload: {
//     id: null,
//     type: "code",
//   },
// });

// console.log(store.getState());
