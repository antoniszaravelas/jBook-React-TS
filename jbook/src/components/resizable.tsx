import "./resizable.css";
import { ResizableBox } from "react-resizable";
import { ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal")
    resizableProps = {
      className: "resize-horizontal",
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      minConstraints: [window.innerWidth * 0.2, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ["e"],
    };
  else
    resizableProps = {
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 100],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };

  return (
    // @ts-ignore
    <ResizableBox {...resizableProps}>{children}</ResizableBox>
  );
};

export default Resizable;
