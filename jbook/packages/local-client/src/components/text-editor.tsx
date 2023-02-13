import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import { useActions } from "../hooks/useActions";
import { Cell } from "../state";
import "./text-editor.css";

interface TextCellProps {
  cell: Cell;
}

const TextEditor: React.FC<TextCellProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();
  const editorRef = useRef<any>();

  useEffect(() => {
    // whenever the user clicks in our document
    const listener = (event: MouseEvent) => {
      if (
        !(
          editorRef.current &&
          event.target &&
          editorRef.current.contains(event.target as Node)
        )
      )
        setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () =>
      document.removeEventListener("click", listener, { capture: true });
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={editorRef}>
        <MDEditor
          value={cell.content}
          onChange={(value) => updateCell(cell.id, value || "")}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown
          source={cell.content || "Click to edit!"}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
