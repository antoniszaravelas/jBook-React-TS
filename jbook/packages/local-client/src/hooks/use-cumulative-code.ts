import { useTypedSelector } from "./use-typed-selector";

const useCumulativeCode = (cellId: string) => {
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cellsReducer;
    const orderedCells = order.map((id) => data[id]);

    const showFunction = `
    import _React from "react";
    import _ReactDOM from "react-dom";
    var show = (value) => {
      const rootElement = document.querySelector("#root");
      if (typeof value === "object"){
        if (value.$$typeof && value.props){
          _ReactDOM.render(value, rootElement)
        }else{
          rootElement.innerHTML = JSON.stringify(value);
        }
      }else{
        rootElement.innerHTML = value;
      }
    }
    `;

    const showFunctionNoOperation = "var show = () => {}";

    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) cumulativeCode.push(showFunction);
        else cumulativeCode.push(showFunctionNoOperation);
        cumulativeCode.push(c.content as string);
        if (c.id === cellId) break;
      }
    }

    return cumulativeCode;
  }).join("\n");

  return cumulativeCode;
};

export default useCumulativeCode;
