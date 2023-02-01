import MonacoEditor, { monaco } from "@monaco-editor/react";
import { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const monacoRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    // getValue finds the text in the editor
    monacoRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      // whenever the contents of the editor change in any way
      onChange(getValue());
    });

    // so a tabSize is 2 spaces and not 4
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // get current value from the editor
    const unformatted = monacoRef.current.getModel().getValue();
    // format this value
    const formatted = prettier.format(unformatted, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    // set the formatted value back in the editor
    monacoRef.current.setValue(formatted);
  };
  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        theme="dark"
        language="javascript"
        height="300px"
        width="300px"
      />
    </div>
  );
};

export default CodeEditor;
