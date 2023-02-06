import { bundlesReducer } from "./bundlesReducer";
import { cellsReducer } from "./cellsReducer";
import { combineReducers } from "redux";

// in case there are more add them here
export const rootReducer = combineReducers({ cellsReducer, bundlesReducer });
// THAT MEANS it is going to be an object that says {reducer: {....}, .. (in case of other reducers)}

export type RootState = ReturnType<typeof rootReducer>;

/*
const a = () => {name:"antonis" , age: 25};
const b: ReturnType<typeof a> 
so b will be of type {name: string, age: number}
*/
