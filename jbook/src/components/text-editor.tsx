import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import "./text-editor.css";

const TextEditor: React.FC = ({}) => {
  const [value, setValue] = useState("**Hello world!!!**");
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
      <div ref={editorRef}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="container">
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
};

export default TextEditor;
