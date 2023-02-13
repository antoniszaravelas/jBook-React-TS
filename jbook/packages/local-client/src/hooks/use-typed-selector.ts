import { useSelector as _useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";
// it is used so Typescript knows the type of the state of the useSelector,
// which in this case is RootState, which comes from the rootReducer
export const useTypedSelector: TypedUseSelectorHook<RootState> = _useSelector;
