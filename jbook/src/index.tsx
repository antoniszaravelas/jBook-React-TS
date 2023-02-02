import React from "react";
import ReactDOM from "react-dom/client";
import CodeCell from "./components/code-cell";
import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
  return <CodeCell />;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
