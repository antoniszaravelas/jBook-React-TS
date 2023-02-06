import "./code-cell.css";
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
  // bundleActionCreator is used here so in every render it may "change" and it re-renders
  // this is why we use useMemo so it doesn't change everytime the component is re-rendered
  const bundle = useTypedSelector((state) => state.bundlesReducer[cell.id]);

  useEffect(() => {
    if (!bundle) {
      bundleActionCreator(cell.id, cell.content || "");
      return;
    }
    const timer = setTimeout(async () => {
      bundleActionCreator(cell.id, cell.content || "");
    }, 750);

    // if I return a function, it will be called next time that useEffect is called
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, bundleActionCreator]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content || ""}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div className="progress-cover">
            <progress className="progress is-small is-primary" max="100">
              Loading...
            </progress>
          </div>
        ) : (
          <Preview code={bundle.code} error={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
