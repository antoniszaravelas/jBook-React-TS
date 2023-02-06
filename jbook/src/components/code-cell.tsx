import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
  cell: Cell;
}

// showing 1 code editor and 1 preview window
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, bundleActionCreator } = useActions();

  const bundle = useTypedSelector((state) => state.bundlesReducer[cell.id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      bundleActionCreator(cell.id, cell.content || "");
    }, 750);

    // if I return a function, it will be called next time that useEffect is called
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content || ""}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {bundle && <Preview code={bundle.code} error={bundle.err} />}
      </div>
    </Resizable>
  );
};

export default CodeCell;
