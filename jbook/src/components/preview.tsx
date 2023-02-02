import { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
}

const html = `
<html>
  <head>
  <style>
  html{background-color: white;}</style>
  </head>
  <body>
      <div id="root"></div>
      <script>

      const handleError = (err) => {
        document.querySelector("#root").innerHTML = '<div>' + err + '</div>';
      }

      window.addEventListener("error", (event)=>{
        event.preventDefault();
        handleError(event.error);
      })

      window.addEventListener("message", (event)=>{
              try{
                eval(event.data);
              }catch(e){
                handleError(e);
              }
          },false)
      </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    // contentWindow returns the Window object of an HTMLIFrameElement
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(
        // this is the bundled code
        code,
        "*"
      );
    }, 50);
  }, [code]);

  return (
    <>
      <div className="preview-wrapper">
        <iframe
          title="codePreview"
          ref={iframeRef}
          srcDoc={html}
          sandbox="allow-scripts"
        />
      </div>
    </>
  );
};

export default Preview;
