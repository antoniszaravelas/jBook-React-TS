import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

// bindActionCreators is a function that contains different actionCreators (an object that has)
// action creators, in our case only one
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};

// It's like that, what I return:
// {searchRepositories: dispatch(searchRepositories(term))}
