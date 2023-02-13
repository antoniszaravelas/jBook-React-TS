import "./resizable.css";
import { ResizableBox } from "react-resizable";
import { ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from "react";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {}, 100);
    const listener = () => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
      if (window.innerWidth * 0.75 < width) {
        setWidth(window.innerWidth * 0.75);
      }
    };

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [width]);

  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal")
    resizableProps = {
      className: "resize-horizontal",
      maxConstraints: [innerHeight * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      height: Infinity,
      width,
      resizeHandles: ["e"],
      // after a user stops resizing the panel (dragging)
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  else
    resizableProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
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
