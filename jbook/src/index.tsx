import React from "react";
import ReactDOM from "react-dom/client";
import CodeCell from "./components/code-cell";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import TextEditor from "./components/text-editor";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
