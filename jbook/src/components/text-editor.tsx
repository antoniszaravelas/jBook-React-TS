import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import "./text-editor.css";

const TextEditor: React.FC = ({}) => {
  const [value, setValue] = useState("**Header**");
  const [editing, setEditing] = useState(false);
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
        <MDEditor value={value} onChange={(value) => setValue(value || "")} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
      </div>
    </div>
  );
};

export default TextEditor;
