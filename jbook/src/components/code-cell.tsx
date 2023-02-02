import React from "react";
import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";

// showing 1 code editor and 1 preview window
const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <>
      <CodeEditor
        onChange={(value) => setInput(value)}
        initialValue="const a =1"
      />
      <br />
      <button style={{ display: "block" }} onClick={onClick}>
        Submit
      </button>
      <Preview code={code} />
    </>
  );
};

export default CodeCell;
